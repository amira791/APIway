from rest_framework import  status
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from .models import *
from .serializers import *
from Consumer.views import index_api
from rest_framework.parsers import MultiPartParser, FormParser
from subprocess import run
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth import get_user_model
from django.db.models import Count
import requests
from django.utils import timezone 
import time
from django.http import JsonResponse
from django.db.models import Min, Max

User = get_user_model()

@api_view(['POST'])
def signup(request):
    user_type = request.data.get('user_type')
    user_data = request.data.get('user')

    # Validate user_type
    if user_type not in ['fournisseur', 'admin', 'consommateur']:
        return Response({'error': 'Invalid user_type'}, status=status.HTTP_400_BAD_REQUEST)

    # Create user and related model based on user_type
    serializer = UserSerializer(data=user_data)
    if serializer.is_valid():
        user = serializer.save()

        user_id = None
        if user_type == 'fournisseur':
            fournisseur = Fournisseur.objects.create(user=user)
            user_id = fournisseur.id_fournisseur
        elif user_type == 'admin':
            admin = Admin.objects.create(user=user)
            user_id = admin.id_admin
        elif user_type == 'consommateur':
            consommateur = Consommateur.objects.create(user=user)
            user_id = consommateur.id_consommateur
        
        access = AccessToken.for_user(user)
        serialized_user = UserSerializer(user).data

        return Response({
            'success': 'User created successfully',
            'access': str(access),
            'user_type': user_type,
            'user_id': user_id,
            'user': serialized_user,
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def signin(request):
    username_or_email = request.data.get('username_or_email')
    password = request.data.get('password')

    if username_or_email is None or password is None:
        return Response({'error': 'Please provide both username/email and password'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the input is an email address
    is_email = '@' in username_or_email

    if is_email:
        user = UserBase.objects.filter(email=username_or_email).first()
    else:
        user = UserBase.objects.filter(username=username_or_email).first()

    if user is None:
        return Response({'error': 'User does not exist'}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.check_password(password):
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    access = AccessToken.for_user(user)

    serialized_user = UserSerializer(user).data

    user_type = None
    user_id = None
    consommateur = Consommateur.objects.filter(user_id=user.id).first()
    if consommateur:
        user_type = 'consommateur'
        user_id = consommateur.id_consommateur
    else:
        fournisseur = Fournisseur.objects.filter(user_id=user.id).first()
        if fournisseur:
            user_type = 'fournisseur'
            user_id = fournisseur.id_fournisseur
        else:
            admin = Admin.objects.filter(user_id=user.id).first()
            if admin:
                user_type = 'admin'
                user_id = admin.id_admin

    return Response({
        'refresh': str(refresh),
        'access': str(access),
        'user_type': user_type,
        'user_id': user_id,
        'user': serialized_user,
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def execute_api(request, website, endpoint):
    try:
        headers = request.data.get('headers', {}) #still not done
      
        api_key = headers.get('x-api-key')

        print(api_key)
        if not api_key:
            return Response({'error': 'API key is missing.'}, status=400)
        
        try:
            subscription = Abonnement.objects.get(api_key=api_key)
        except Abonnement.DoesNotExist:
            return Response({'error': 'Invalid API key'}, status=403)

        if subscription.end_date < timezone.now().date():
            return Response({'error': 'API key has expired'}, status=403)

        if subscription.quota_remaining <= 0:
            return Response({'error': 'Quota exceeded'}, status=403)

        print(request.data)
        params = request.data.get('params', {})
        body = request.data.get('body', None)
        path_params = request.data.get('path_params', {})
        method = request.data.get('method')
        selectedEndpointId =  request.data.get('selectedEndpoint')
        # Replace {} in the endpoint with the actual value
        formatted_endpoint = endpoint.format(**path_params)

        # Construct the full URL with formatted endpoint
        full_url = f"{website}/{formatted_endpoint}"
        try:
            selectedEndpoint = APIendpoint.objects.get(id_endpoint=selectedEndpointId)
        except APIendpoint.DoesNotExist:
            return Response({'error': 'Invalid endpoint.'}, status=404)

        print(full_url)
        start_time = time.time()
        response = requests.request(method=method,
                                    url=full_url,
                                    headers=headers,
                                    params=params,
                                    json=body if body else None)
        response_time = time.time() - start_time
        # Handle response
        result = {
            'status_code': response.status_code,
            'headers': dict(response.headers),
            'body': response.json() if response.headers.get('content-type') == 'application/json' else response.text
        }
        APIUsage.objects.create(
            subscription=subscription,
            status_code=response.status_code,
            response_time=response_time,
            endpoint=selectedEndpoint
        )

        # Update the quota
        subscription.quota_remaining -= 1
        subscription.save()

      #condition for when there is an error in the returned value
        return Response({'result': result})
    except requests.exceptions.RequestException as e:
        return Response({'error': str(e)}, status=400)
    except Abonnement.DoesNotExist:
        return Response({'result':{
           
            'body': "You need to resubscribe in  order to execute"
        },'error': 'Invalid API key.'}, status=403)

# Fournisseur View
class FournisseurView(viewsets.ModelViewSet):
    serializer_class = FournisseurSerializer
    queryset = Fournisseur.objects.all()

class FournisseurByUserView(viewsets.ModelViewSet):
    serializer_class = FournisseurSerializer
    lookup_field = 'user_id'

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')  # Get user_id from URL kwargs
        if user_id:
            return Fournisseur.objects.filter(user_id=user_id)
        return Fournisseur.objects.none()  # Return an empty queryset if user_id is not provided


# Admin View
class AdminView(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

# Consommateur View
class ConsommateurView(viewsets.ModelViewSet):
    serializer_class = ConsommateurSerializer
    queryset = Consommateur.objects.all()

class ConsommateurByUserView(viewsets.ModelViewSet):
    serializer_class = ConsommateurSerializer
    lookup_field = 'user_id'

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')  # Get user_id from URL kwargs
        if user_id:
            return Consommateur.objects.filter(user_id=user_id)
        return Consommateur.objects.none()  # Return an empty queryset if user_id is not provided
# APIcategory View
class APIcategoryView(viewsets.ModelViewSet):
    queryset = APIcategory.objects.all()
    serializer_class = APIcategorySerializer

# API View
class APIView(viewsets.ModelViewSet):
    queryset = API.objects.all()
    serializer_class = APISerializer
    parser_classes = (MultiPartParser, FormParser)

class APIByProviderView(viewsets.ModelViewSet):
    serializer_class = APISerializer
    lookup_field = 'provider'

    def get_queryset(self):
        provider_id = self.kwargs.get('provider')  # Get provider_id from URL kwargs
        if provider_id:
            return API.objects.filter(provider=provider_id)
        return API.objects.none()  # Return an empty queryset if provider_id is not provided



# APIversion View
class APIversionView(viewsets.ModelViewSet):
    queryset = APIversion.objects.all()
    serializer_class = APIversionSerializer

# APIendpoint View
class APIendpointView(viewsets.ModelViewSet):
    queryset = APIendpoint.objects.all()
    serializer_class = APIendpointSerializer

# Functionnality View
class FunctionnalityView(viewsets.ModelViewSet):
    queryset = Functionnality.objects.all()
    serializer_class = FunctionnalitySerializer
   

# APIdocumentation View
class APIdocumentationView(viewsets.ModelViewSet):
    queryset = APIdocumentation.objects.all()
    serializer_class = APIdocumentationSerializer

class APIForumView(viewsets.ModelViewSet):
    serializer_class = APIForumSerializer
    queryset = APIForum.objects.all()


# Forum Thread View
class ThreadView(viewsets.ModelViewSet):
    queryset = Thread.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ThreadWriteSerializer  # Use ThreadWriteSerializer for write operations
        return ThreadReadSerializer  # Use ThreadReadSerializer for read operations

    def get_queryset(self):
        queryset = self.queryset
        forum_id = self.kwargs.get('forum_id')
        if forum_id:
            queryset = queryset.filter(forum_id=forum_id)
        return queryset


# Forum Comment View
class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        id_fournisseur = self.request.data.get('id_fournisseur')
        id_consommateur = self.request.data.get('id_consommateur')

        if id_fournisseur:
            try:
                user_profile = Fournisseur.objects.get(pk=id_fournisseur)
            except Fournisseur.DoesNotExist:
                raise ValidationError("Invalid Fournisseur ID")
        elif id_consommateur:
            try:
                user_profile = Consommateur.objects.get(pk=id_consommateur)
            except Consommateur.DoesNotExist:
                raise ValidationError("Invalid Consommateur ID")
        else:
            raise ValidationError("No user identifier provided")

        user = user_profile.user
        serializer.save(created_by=user)

    def get_queryset(self):
        queryset = self.queryset
        thread_id = self.kwargs.get('thread_id')
        if thread_id:
            queryset = queryset.filter(thread_id=thread_id)
        return queryset
#Ticket View
class TicketView(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_queryset(self):
        queryset = self.queryset
        api_id = self.kwargs.get('api_id')
        if api_id:
            queryset = queryset.filter(api_id=api_id)
        return queryset 
    
    @action(detail=True, methods=['post'])
    def change_ticket_status(self, request, pk=None):
        try:
            ticket = Ticket.objects.get(pk=pk)
            ticket.status = self.request.data.get('status')
            ticket.save()
            return Response({'status': 'Ticket status changed'}, status=status.HTTP_200_OK)
        except Ticket.DoesNotExist:
            return Response({'error': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)


    @action(detail=True, methods=['post'])
    def close_ticket(self, request, pk=None):
        try:
            ticket = self.get_object()
            ticket.status = 'closed'
            ticket.save()
            return Response({'status': 'Ticket closed'}, status=status.HTTP_200_OK)
        except Ticket.DoesNotExist:
            return Response({'error': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def open_ticket(self, request, pk=None):
        try:
            ticket = self.get_object()
            ticket.status = 'open'
            ticket.save()
            return Response({'status': 'Ticket opened'}, status=status.HTTP_200_OK)
        except Ticket.DoesNotExist:
            return Response({'error': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)
        
class TicketsByProviderView(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    lookup_field = 'provider'

    def get_queryset(self):
        provider_id = self.kwargs.get('provider')  # Get provider_id from URL kwargs
        if provider_id:
            return Ticket.objects.filter(api_id__provider=provider_id)
        return Ticket.objects.none() 
class TicketsByConsumerView(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    lookup_field = 'created_by'

    def get_queryset(self):
        consumer_id = self.kwargs.get('consumer')  # Get provider_id from URL kwargs
        if consumer_id:
            return Ticket.objects.filter(created_by=consumer_id)
        return Ticket.objects.none()    

class TicketResponseView(viewsets.ModelViewSet):
    queryset = TicketResponse.objects.all()
    serializer_class = TicketResponseSerializer

    def get_queryset(self):
        ticket_id = self.kwargs.get('ticket_id')
        return TicketResponse.objects.filter(ticket=ticket_id)
    
    def perform_create(self, serializer):
        creator_id = self.request.data.get('created_by')
        ticket_id = self.request.data.get('ticket')
        user_type = self.request.data.get('user_type')


        if user_type == 'fournisseur':
            user = Fournisseur.objects.filter(id_fournisseur=creator_id).first()
        else:
            if user_type == 'consommateur':
             user = Consommateur.objects.filter(id_consommateur=creator_id).first()
            else:
             raise serializers.ValidationError("Invalid creator ID provided.")
        
        userr = UserBase.objects.get(id=user.user_id)
        serializer.save(created_by=userr)
        ticket = Ticket.objects.get(ticket_id=ticket_id)
        
        if user_type == 'fournisseur':
            ticket.status = 'in progress'
            ticket.save()

        
    
# Tarification View
class TarificationView(viewsets.ModelViewSet):
    queryset = Tarification.objects.all()
    serializer_class = TarificationSerializer

# Abonnement View
class AbonnementView(viewsets.ModelViewSet):
    queryset = Abonnement.objects.all()
    serializer_class = AbonnementSerializer
    
# Endpoint_parameter View
class Endpoint_parameterView(viewsets.ModelViewSet):
    queryset = Endpoint_parameter.objects.all()
    serializer_class = Endpoint_parameterSerializer

# Type View
class TypeView(viewsets.ModelViewSet):
    queryset = TypeParam.objects.all()
    serializer_class = TypeParamSerializer
    
# Type View
class ApiHeaderView(viewsets.ModelViewSet):
    queryset = ApiHeader.objects.all()
    serializer_class = ApiHeaderSerializer
    
# ApiQueryParam View
class ApiQueryParamView(viewsets.ModelViewSet):
    queryset = ApiQueryParam.objects.all()
    serializer_class = ApiQueryParamSerializer
    
# ApiEndpointBody View
class ApiEndpointBodyView(viewsets.ModelViewSet):
    queryset = ApiEndpointBody.objects.all()
    serializer_class = ApiEndpointBodySerializer

# TypeTarif View
class TypeTarifView(viewsets.ModelViewSet):
    queryset = TypeTarif.objects.all()
    serializer_class = TypeTarifSerializer
    
# PricingModel View
class PricingModelView(viewsets.ModelViewSet):
    queryset = PricingModel.objects.all()
    serializer_class = PricingModelSerializer

# ResponseExample View
class ResponseExampleView(viewsets.ModelViewSet):
    queryset = ResponseExample.objects.all()
    serializer_class = ResponseExampleSerializer


# Sorting APIs*************************************************************************************************************
@api_view(['POST'])
def api_versions_view(request):
    sortby = request.data.get('sortby')  # Get sort parameter from frontend
    
    if sortby == 'recent':
       apis = API.objects.annotate(latest_version_date=Max('apiversion__date_version')).order_by('-latest_version_date')
    
    elif  sortby == 'oldest':
          apis = API.objects.annotate(latest_version_date=Max('apiversion__date_version')).order_by('latest_version_date')

    else:
        # Default sorting, no sorting by versions
        apis = API.objects.all()

    serializer = APISerializer(apis, many=True)
    return Response(serializer.data)



# Accounts management view *****************************************************************************

#Activate status-------------------------------------------------------
@api_view(['POST'])
def activate_user(request, id):
    return manage_user_status(request, id, action='activate')

#Deactivate status-----------------------------------------------------
@api_view(['POST'])
def deactivate_user(request, id):
    return manage_user_status(request, id, action='deactivate')


# Managing function-----------------------------------------------------
def manage_user_status(request, id, action):
    # Get user type from request data
    user_type = request.data.get('type')
    
    # Check user type and retrieve the corresponding user model
    if user_type == 'F':
        user_model = Fournisseur
    elif user_type == 'C':
        user_model = Consommateur
    else:
        return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if user exists
    try:
        user_instance = user_model.objects.get(pk=id)
    except user_model.DoesNotExist:
        return Response({'error': f'{user_model.__name__} does not exist'}, status=status.HTTP_404_NOT_FOUND)

    # Update user status based on the action
    if action == 'activate':
        user_instance.user.is_active = True
    elif action == 'deactivate':
        user_instance.user.is_active = False
    else:
        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

    # Save the user instance
    user_instance.user.save()

    # Serialize and return the updated user data
    serializer_class = FournisseurSerializer if user_type == 'F' else ConsommateurSerializer
    serializer = serializer_class(user_instance)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Sorting APIs*************************************************************************************************************
@api_view(['POST'])
def api_versions_view(request):
    sortby = request.data.get('sortby')  # Get sort parameter from frontend
    
    if sortby == 'recent':
       apis = API.objects.annotate(latest_version_date=Max('apiversion__date_version')).order_by('-latest_version_date')
    
    elif  sortby == 'oldest':
          apis = API.objects.annotate(latest_version_date=Max('apiversion__date_version')).order_by('latest_version_date')

    else:
        # Default sorting, no sorting by versions
        apis = API.objects.all()

    serializer = APISerializer(apis, many=True)
    return Response(serializer.data)

# Get API functions*******************************************
@api_view(['GET'])
def get_api_functions(request, id):
    try:
        # Fetch API instance based on api_id
        api_instance = API.objects.get(id_api=id)
        
        # Fetch API version associated with the API instance
        api_version = APIversion.objects.filter(api=api_instance).first()
        
        if api_version:
            # Fetch functions associated with the API version
            functions = api_version.functions.all()
            
            # Serialize the functions data
            serializer = FunctionnalitySerializer(functions, many=True)
            
            # Return the serialized functions data
            return Response(serializer.data)
        else:
            return Response({'error': 'API version not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except API.DoesNotExist:
        return Response({'error': 'API not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ResponseExample View
class APIUsageView(viewsets.ModelViewSet):
    queryset = APIUsage.objects.all()
    serializer_class = APIUsageSerializer


""" class ExecuteAPI(APIView):
permission_classes = [IsAuthenticated]

def post(self, request): 
        api_id = request.data.get('apiId')
        endpoint_id = request.data.get('endpointId')
        params = request.data.get('params', {})
        try:
            api = API.objects.get(id_api=api_id)
            endpoint = APIendpoint.objects.get(id_endpoint=endpoint_id)
            headers = {header.key: header.example_value for header in endpoint.headers.all()}
            query_params = {param.key: param.example_value for param in endpoint.query_params.all()}
            body_params = {body.payload_name: body.body_example for body in endpoint.body.all()}

            response = requests.request(
                method=endpoint.method,
                url=api.website + endpoint.path,
                headers=headers,
                params=query_params,
                json=body_params if endpoint.method in ['POST', 'PUT', 'PATCH'] else None
            )
            return Response(response.json(), status=response.status_code)
        except (API.DoesNotExist, APIendpoint.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        except requests.RequestException as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)"""
# Admin Dashboard----------------------------------------------------------------

# Pie chart
@api_view(['GET'])
def pie_chart_data(request):
    active_fournisseurs = Fournisseur.objects.filter(user__is_active=True).count()
    inactive_fournisseurs = Fournisseur.objects.filter(user__is_active=False).count()
    active_consommateurs = Consommateur.objects.filter(user__is_active=True).count()
    inactive_consommateurs = Consommateur.objects.filter(user__is_active=False).count()

    data = {
        "active_fournisseurs": active_fournisseurs,
        "inactive_fournisseurs": inactive_fournisseurs,
        "active_consommateurs": active_consommateurs,
        "inactive_consommateurs": inactive_consommateurs,
    }
    return JsonResponse(data)


# Bar chart
@api_view(['GET'])
def bar_chart_data(request):
    fournisseurs_data = (
        Fournisseur.objects
        .annotate(api_count=Count('api'))
        .values('user__username', 'api_count')
    )

    data = {
        "fournisseurs": list(fournisseurs_data),
    }
    return JsonResponse(data)


# Line chart
@api_view(['GET'])
def line_chart_data(request):
    # Assuming `Abonnement` model is used for counting API sales
    top_apis = Abonnement.objects.values('api__api_name').annotate(sales_count=Count('api')).order_by('-sales_count')[:7]
    data = {
        'top_apis': list(top_apis)
    }
    return Response(data)