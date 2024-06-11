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
router.register(r'apiforum',APIForumView,basename='apiforum')
router.register(r'threads',ThreadView,basename='threads')
router.register(r'posts',PostView,basename='posts')
router.register(r'tickets',TicketView,basename='tickets')
router.register(r'tarifications', TarificationView, basename='tarification')
router.register(r'abonnements', AbonnementView, basename='abonnement')

# Get the urlpatterns from the router
urlpatterns = [
    path('apiforum/<int:forum_id>/threads/', ThreadView.as_view({'get': 'list'}), name='forum_threads'),
    path('threads/<int:thread_id>/posts/', PostView.as_view({'get': 'list'}), name='thread_posts'),
    path('apis/<int:api_id>/tickets/', TicketView.as_view({'get': 'list'}), name='api_tickets'),
    path('activate/<int:id>/', activate_user, name='activate_user'),
    path('deactivate/<int:id>/', deactivate_user, name='deactivate_user'),
    path('api/search/', search_api, name='search_api'),
    path('api/versions/', api_versions_view, name='api-versions'),
    path('api/functions/<int:id>/', get_api_functions, name='api-functions'),
    path('signup/',signup),
    path('signin/',signin),
    path('api/pie_chart_data/', pie_chart_data, name='pie_chart_data'),
    path('api/bar_chart_data/', bar_chart_data, name='bar_chart_data'),
    path('api/line_chart_data/', line_chart_data, name='line_chart_data'),
   
    ] + router.urls