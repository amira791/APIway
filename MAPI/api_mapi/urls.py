
from django.urls import path
from .views import *
from rest_framework import routers

# Define the SimpleRouter
router = routers.SimpleRouter()

# Register the views with the router
router.register(r'fournisseurs', FournisseurView, basename='fournisseur')
router.register(r'admins', AdminView, basename='admin')
router.register(r'consommateurs', ConsommateurView, basename='consommateur')
router.register(r'apicategories', APIcategoryView, basename='apicategory')
router.register(r'apis', APIView, basename='api')
router.register(r'apiversions', APIversionView, basename='apiversion')
router.register(r'apiendpoints', APIendpointView, basename='apiendpoint')
router.register(r'functionnalities', FunctionnalityView, basename='functionnality')
router.register(r'apidocumentations', APIdocumentationView, basename='apidocumentation')
router.register(r'tarifications', TarificationView, basename='tarification')
router.register(r'abonnements', AbonnementView, basename='abonnement')

# Get the urlpatterns from the router
urlpatterns = [
    path('activate/<int:id>/', activate_user, name='activate_user'),
    path('deactivate/<int:id>/', deactivate_user, name='deactivate_user'),
    path('api/search/', search_api, name='search_api'),
    path('api/versions/', api_versions_view, name='api-versions'),
    path('signup/',signup),
    path('signin/',signin)
   
    ] + router.urls