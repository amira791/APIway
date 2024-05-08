from django.urls import path
from .views import *
from rest_framework import routers

# Define the SimpleRouter
router = routers.SimpleRouter()

# Register the views with the router
router.register(r'admins', AdminView, basename='admin')
router.register(r'consommateurs', ConsommateurView, basename='consommateur')
router.register(r'fournisseurs', FournisseurView, basename='fournisseurs')
router.register(r'apis', APIView, basename='api')
router.register(r'apicategories', APIcategoryView, basename='apicategory')
router.register(r'apiversions', APIversionView, basename='apiversion')
router.register(r'apiendpoints', APIendpointView, basename='apiendpoint')
router.register(r'functionnalities', FunctionnalityView, basename='functionnality')
router.register(r'apidocumentations', APIdocumentationView, basename='apidocumentation')
router.register(r'apiforum',APIForumView,basename='apiforum')
router.register(r'threads',ThreadView,basename='threads')
router.register(r'comments',CommentView,basename='comments')
router.register(r'tickets',TicketView,basename='tickets')
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
router.register(r'responseexample', ResponseExampleView, basename='responseexample')

# Get the urlpatterns from the router
urlpatterns = [
    path('apiforum/<int:forum_id>/threads/', ThreadView.as_view({'get': 'list'}), name='forum_threads'),
    path('threads/<int:thread_id>/comments/', CommentView.as_view({'get': 'list'}), name='thread_comments'),
    path('apis/<int:pk>/', APIView.as_view({'get': 'retrieve'}), name='api_detail'),
    path('apis/byprovider/<int:provider>/', APIByProviderView.as_view({'get': 'list'}), name='api_by_provider'),
    path('apis/<int:api_id>/tickets/', TicketView.as_view({'get': 'list'}), name='api_tickets'),
    path('activate/<int:id>/', activate_user, name='activate_user'),
    path('deactivate/<int:id>/', deactivate_user, name='deactivate_user'),
    path('fournisseurs/<int:pk>/', FournisseurView.as_view({'get': 'retrieve'}), name='fournisseur_detail'),
    path('fournisseurs/byuser/<int:user_id>/', FournisseurByUserView.as_view({'get': 'list'}), name='fournisseur_by_user'),
    path('consommateurs/<int:pk>/', ConsommateurView.as_view({'get': 'retrieve'}), name='consommateur_detail'),
    path('consommateurs/byuser/<int:user_id>/', ConsommateurByUserView.as_view({'get': 'list'}), name='consommateur_by_user'),
    path('api/search/', search_api, name='search_api'),
    path('api/versions/', api_versions_view, name='api-versions'),
    path('api/functions/<int:id>/', get_api_functions, name='api-functions'),
    path('signup/',signup),
    path('signin/',signin)
   
] + router.urls
