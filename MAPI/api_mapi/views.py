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

class APIForumView(viewsets.ModelViewSet):
    queryset = APIForum.objects.all()
    serializer_class = APIForumSerializer

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


# Forum Post View
class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

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
    
