from django.urls import path
from .views import *
from rest_framework import routers

# Define the SimpleRouter
router = routers.SimpleRouter()

# Register the views with the router


# Get the urlpatterns from the router
urlpatterns = [
    path('api/search/', search_api, name='search_api'),
   
    ] + router.urls