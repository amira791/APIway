from django.apps import AppConfig


class ApiMapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api_mapi'
    def ready(self):
        from .models import UserBase  # Import the custom user model
