from rest_framework import  status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from Consumer.views import index_api
from rest_framework.parsers import MultiPartParser, FormParser
from subprocess import run
from django.db.models import Q
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth import get_user_model



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

    # def get_queryset(self):
    #     queryset = APIForum.objects.all()
    #     api_id = self.kwargs.get('api_id')
    #     if api_id is not None:
    #         queryset = queryset.filter(api_id=api_id)
    #     return queryset
    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     serializer = self.get_serializer(queryset.first())  
    #     return Response(serializer.data)

# Forum Thread View
class ThreadView(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    # permission_classes = [IsAuthenticated]


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
        serializer.save(created_by=self.request.user)

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
# BaseLink View
class BaseLinkView(viewsets.ModelViewSet):
    queryset = BaseLink.objects.all()
    serializer_class = BaseLinkSerializer
# BaseLink View
class BaseLinkView(viewsets.ModelViewSet):
    queryset = BaseLink.objects.all()
    serializer_class = BaseLinkSerializer
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



# Accounts management view *****************************************************************************

#Activate status-------------------------------------------------------
@api_view(['POST'])
def activate_user(request, id):
    return manage_user_status(request, id, action='activate')

#Deactivate status-----------------------------------------------------
@api_view(['POST'])
def deactivate_user(request, id):
    return manage_user_status(request, id, action='deactivate')


#Managing function-----------------------------------------------------
def manage_user_status(request, id, action):
    # Get user type from request data
    user_type = request.data.get('type')
    
    # Check user type and retrieve the corresponding user object
    if user_type == 'F':
        user_model = Fournisseur
        serializer_class = FournisseurSerializer
        id_field = 'id_fournisseur'
        status_field = 'is_active'
    elif user_type == 'C':
        user_model = Consommateur
        serializer_class = ConsommateurSerializer
        id_field = 'id_consommateur'
        status_field = 'is_active'
    else:
        return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if user exists
    try:
        user_instance = user_model.objects.get(**{id_field: id})
    except user_model.DoesNotExist:
        return Response({'error': f'{user_model.__name__} does not exist'}, status=status.HTTP_404_NOT_FOUND)

    # Update user status based on the action
    if action == 'activate':
        new_status = 'Active'
    elif action == 'deactivate':
        new_status = 'Inactive'
    else:
        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

    # Update user status
    setattr(user_instance, status_field, new_status)
    user_instance.save()

    # Serialize and return the updated user data
    serializer = serializer_class(user_instance)
    return Response(serializer.data, status=status.HTTP_200_OK)
# Search API by Name, Description, or Functionalities **************************************************************
@api_view(['POST'])
def search_api(request):
    query = request.data.get('query', '')
    search_field = request.data.get('filter')
    category_label = request.data.get('category')

    # Check if search_field parameter is provided
    if not search_field:
        return Response({'error': 'search_field parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Define the fields to search based on the selected search field
    if search_field == 'Name':
        search_query = Q(api_name__icontains=query)
    elif search_field == 'Description':
        search_query = Q(description__icontains=query)
    elif search_field == 'Category':
        if query == 'All':
            search_query = Q()  # Empty query, which means all APIs will be included
        else:
            search_query = Q(category__label__icontains=query)
    elif search_field == 'Functionalities':
        search_query = Q(apiversion__functions__functName__icontains=query)

    else:
        return Response({'error': 'Invalid search field'}, status=status.HTTP_400_BAD_REQUEST)

    # Filter results based on the search query and category label
    if category_label and category_label != 'All':
        results = API.objects.filter(search_query, category__label=category_label).distinct()
    else:
        results = API.objects.filter(search_query).distinct()

    serializer = APISerializer(results, many=True)
    return Response(serializer.data)



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
