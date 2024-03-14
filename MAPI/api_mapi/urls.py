from .views import *
from django.urls import path, include

urlpatterns = [
   path('fournisseur/api', FournisseurView.as_view()),
   path('admin/api', AdminView.as_view()),
   path('consommateur/api', ConsommateurView.as_view()),
   path('apicategory/api', APIcategoryView.as_view()),
   path('api/api', APIView.as_view()),
   path('apiversion/api', APIversionView.as_view()),
   path('apiendpoint/api', APIendpointView.as_view()),
   path('functionnality/api', FunctionnalityView.as_view()),
   path('apidocumentation/api', APIdocumentationView.as_view()),
   path('tarification/api', TarificationView.as_view()),
   path('abonnement/api', AbonnementView.as_view()),
   path('type/api', TypeView.as_view()),
   path('endpoint_parameter/api', Endpoint_parameterView.as_view()),

]