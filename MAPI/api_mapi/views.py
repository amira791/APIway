from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
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

#API Forum View
class APIForumView(generics.CreateAPIView):
    queryset = APIForum.objects.all()
    serializer_class = APIForumSerializer
    http_method_names = ['post', 'get']

# Forum Thread View
class ThreadView(generics.CreateAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    http_method_names = ['post', 'get']

# Forum Post View
class PostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    http_method_names = ['post', 'get']
    
# Tarification View
class TarificationView(generics.CreateAPIView):
    queryset = Tarification.objects.all()
    serializer_class = TarificationSerializer

# Abonnement View
class AbonnementView(generics.CreateAPIView):
    queryset = Abonnement.objects.all()
    serializer_class = AbonnementSerializer