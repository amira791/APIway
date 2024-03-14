from rest_framework import generics , status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *

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