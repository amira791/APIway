from rest_framework import generics , status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from django.shortcuts import render
from django.db.models import Q
from rest_framework import viewsets
from .models import Fournisseur, Consommateur
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser



@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        # Check user type and use corresponding serializer
        if request.data['type'] == "F":
            serializer = FournisseurSerializer(data=request.data)
        elif request.data['type'] == "C":
            serializer = ConsommateurSerializer(data=request.data)
        else:
            return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)

        # Validate data and return errors if any
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Save user and retrieve token (logic might need adjustment)
        serializer.save()
        user = serializer.instance  # Access the saved user object
        token = Token.objects.get(user=user)  # Create or retrieve token

        # Return successful response with user details and token
        return Response({"token": token.key, "user": user, "type": request.data['type']}, status=status.HTTP_201_CREATED)

    return Response({}, status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Handle non-POST requests
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
    



# Accounts management view

#Activate status
@api_view(['POST'])
def activate_user(request, id):
    return manage_user_status(request, id, action='activate')

#Deactivate status
@api_view(['POST'])
def deactivate_user(request, id):
    return manage_user_status(request, id, action='deactivate')


#Managing function
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



# Search API by Name, Description, or Functionalities
@api_view(['POST'])
def search_api(request):
    query = request.data.get('query', '')
    search_field = request.data.get('filter')

    # Check if search_field parameter is provided
    if not search_field:
        return Response({'error': 'search_field parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Define the fields to search based on the selected search field
    if search_field == 'Name':
        search_query = Q(api_name__icontains=query)
    elif search_field == 'Description':
        search_query = Q(description__icontains=query)
    elif search_field == 'Functionalities':
        # Modify the search query to search within the functionalities of API versions
        search_query = Q(apiversion__functions__functName__icontains=query)
    else:
        # Handle invalid search field
        return Response({'error': 'Invalid search field'}, status=status.HTTP_400_BAD_REQUEST)

    # Filter results based on the search query
    results = API.objects.filter(search_query).distinct()  # Ensure distinct results
    serializer = APISerializer(results, many=True)
    return Response(serializer.data)
