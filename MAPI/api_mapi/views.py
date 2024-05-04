from rest_framework import generics , status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from django.db.models import Q
from rest_framework import viewsets
from .models import Fournisseur, Consommateur
from django.db.models import  Max
from rest_framework.parsers import MultiPartParser, FormParser
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

        if user_type == 'fournisseur':
            Fournisseur.objects.create(user=user)
        elif user_type == 'admin':
            Admin.objects.create(user=user)
        elif user_type == 'consommateur':
            Consommateur.objects.create(user=user)
        
        access = AccessToken.for_user(user)
        serialized_user = UserSerializer(user).data

        return Response({
            'success': 'User created successfully',
            'access': str(access),
            'user_type': user_type,
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

    return Response({
        'refresh': str(refresh),
        'access': str(access),
        'user': serialized_user,
    }, status=status.HTTP_200_OK)


# Fournisseur View
class FournisseurView(viewsets.ModelViewSet):
    queryset = Fournisseur.objects.all()
    serializer_class = FournisseurSerializer
    

# Admin View
class AdminView(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

# Consommateur View
class ConsommateurView(viewsets.ModelViewSet):
    queryset = Consommateur.objects.all()
    serializer_class = ConsommateurSerializer

# APIcategory View
class APIcategoryView(viewsets.ModelViewSet):
    queryset = APIcategory.objects.all()
    serializer_class = APIcategorySerializer

# API View
class APIView(viewsets.ModelViewSet):
    queryset = API.objects.all()
    serializer_class = APISerializer
    parser_classes = (MultiPartParser, FormParser)
   


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

    def get_queryset(self):
        queryset = APIForum.objects.all()
        api_id = self.kwargs.get('api_id')
        if api_id is not None:
            queryset = queryset.filter(api_id=api_id)
        return queryset
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset.first())  
        return Response(serializer.data)

# Forum Thread View
class ThreadView(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

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


# Forum Post View
class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

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
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    



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
        status_field = 'FRstatus'
    elif user_type == 'C':
        user_model = Consommateur
        serializer_class = ConsommateurSerializer
        id_field = 'id_consommateur'
        status_field = 'CNstatus'
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