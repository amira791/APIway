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
router.register(r'comments',CommentView,basename='comments')
router.register(r'tickets',TicketView,basename='tickets')
router.register(r'tarifications', TarificationView, basename='tarification')
router.register(r'abonnements', AbonnementView, basename='abonnement')

# Get the urlpatterns from the router
urlpatterns = [
    path('apiforum/<int:forum_id>/threads/', ThreadView.as_view({'get': 'list'}), name='forum_threads'),
    path('threads/<int:thread_id>/comments/', CommentView.as_view({'get': 'list'}), name='thread_comments'),
    path('apis/<int:api_id>/forum/', APIForumView.as_view({'get': 'list'}), name='api_forum'),
    path('apis/<int:api_id>/tickets/', TicketView.as_view({'get': 'list'}), name='api_tickets'),
    path('activate/<int:id>/', activate_user, name='activate_user'),
    path('deactivate/<int:id>/', deactivate_user, name='deactivate_user'),
    path('fournisseurs/<int:user_id>/', FournisseurView.as_view({'get': 'retrieve'})),
    path('api/search/', search_api, name='search_api'),
    path('api/versions/', api_versions_view, name='api-versions'),
    path('signup/',signup),
    path('signin/',signin)
   
    ] + router.urls