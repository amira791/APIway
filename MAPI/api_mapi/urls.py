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
router.register(r'types_param', TypeView, basename='types_param')
router.register(r'types_tarif', TypeTarifView, basename='types_tarif')
router.register(r'apiheaders', ApiHeaderView, basename='apiheaders')
router.register(r'apiquery', ApiQueryParamView, basename='apiquery')
router.register(r'apiendpointbody', ApiEndpointBodyView, basename='apiendpointbody')
router.register(r'baselink', BaseLinkView, basename='baselink')
router.register(r'pricing_model', PricingModelView, basename='pricing_model')
router.register(r'endpoint_parameter', Endpoint_parameterView, basename='endpoint_parameter')

# Get the urlpatterns from the router
urlpatterns = router.urls