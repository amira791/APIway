from django.apps import AppConfig

class ConsumerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Consumer'
    
    # def ready(self):
    #     import Consumer.signals
    # def ready(self):
    #     import Consumer.signals
