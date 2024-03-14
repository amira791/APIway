from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *

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