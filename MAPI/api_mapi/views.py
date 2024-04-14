from rest_framework import generics , status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import *
from .serializers import *


# @api_view(['POST'])
# def signup(request):

#     if request.method == 'POST':
#         # Check user type and use corresponding serializer
#         if request.data['type'] == "F":
#             serializer = FournisseurSerializer(data=request.data)
#         elif request.data['type'] == "C":
#             serializer = ConsommateurSerializer(data=request.data)
#         else:
#             return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)

#         # Validate data and return errors if any
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # Save user and retrieve token (logic might need adjustment)
#         user  =serializer.save()
#         refresh = RefreshToken.for_user(user)
#         return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#         }, status=status.HTTP_201_CREATED)
#     return Response({}, status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Handle non-POST requests

#######################     old sign up     ##################################
# @api_view(['POST'])
# def signup(request):

#     if request.method == 'POST':
#         # Check user type and use corresponding serializer
#         if request.data['type'] == "F":
#             serializer = FournisseurSerializer(data=request.data)
#         elif request.data['type'] == "C":
#             serializer = ConsommateurSerializer(data=request.data)
#         else:
#             return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)

#         # Validate data and return errors if any
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # Save user and retrieve token (logic might need adjustment)
#         user = serializer.save()  # This line saves the user using the serializer

#         # The following lines may need adjustment based on your authentication method
#         refresh = RefreshToken.for_user(user)  # Assuming you are using SimpleJWT
#         return Response({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#         }, status=status.HTTP_201_CREATED)
#     return Response({}, status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Handle non-POST requests



















# @api_view(['POST'])
# def signup(request):
#     if request.method == 'POST':
#         user_type = request.data.get('type')
#         if user_type not in ('F', 'C'):
#             return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)

#         required_fields = ['password', 'FRemail', 'FRphone'] if user_type == 'F' else ['password', 'CNemail', 'CNphone']
#         missing_fields = [field for field in required_fields if field not in request.data]
#         if missing_fields:
#             return Response({'error': f"Missing fields: {', '.join(missing_fields)}"}, status=status.HTTP_400_BAD_REQUEST)

#         # Select the serializer based on user_type
#         serializer_class = FournisseurSerializer if user_type == 'F' else ConsommateurSerializer

#         serializer = serializer_class(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({'success': 'User created successfully'}, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     else:
#         return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        user_type = request.data.get('type')
        if user_type not in ('F', 'A', 'C'):
            return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)

        if user_type == 'F':
            serializer_class = FournisseurSerializer
        elif user_type == 'A':
            serializer_class = AdminSerializer
        else:
            serializer_class = ConsommateurSerializer

        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'success': 'User created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def signin(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
     
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    else:
      return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# Fournisseur View

class FournisseurView(generics.CreateAPIView):
    queryset = Fournisseur.objects.all()
    serializer_class = FournisseurSerializer

# Admin View
class AdminView(generics.CreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

# Consommateur View
class ConsommateurView(generics.CreateAPIView):
    queryset = Consommateur.objects.all()
    serializer_class = ConsommateurSerializer

# APIcategory View
class APIcategoryView(generics.CreateAPIView):
    queryset = APIcategory.objects.all()
    serializer_class = APIcategorySerializer

# API View
class APIView(generics.CreateAPIView):
    queryset = API.objects.all()
    serializer_class = APISerializer

# APIversion View
class APIversionView(generics.CreateAPIView):
    queryset = APIversion.objects.all()
    serializer_class = APIversionSerializer

# APIendpoint View
class APIendpointView(generics.CreateAPIView):
    queryset = APIendpoint.objects.all()
    serializer_class = APIendpointSerializer

# Functionnality View
class FunctionnalityView(generics.CreateAPIView):
    queryset = Functionnality.objects.all()
    serializer_class = FunctionnalitySerializer

# APIdocumentation View
class APIdocumentationView(generics.CreateAPIView):
    queryset = APIdocumentation.objects.all()
    serializer_class = APIdocumentationSerializer

# Tarification View
class TarificationView(generics.CreateAPIView):
    queryset = Tarification.objects.all()
    serializer_class = TarificationSerializer

# Abonnement View
class AbonnementView(generics.CreateAPIView):
    queryset = Abonnement.objects.all()
    serializer_class = AbonnementSerializer