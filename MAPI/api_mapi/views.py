from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser

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