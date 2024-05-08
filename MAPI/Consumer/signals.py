from django.db.models.signals import post_save
from django.dispatch import receiver
from api_mapi.models import *
from django.core.management import call_command
# for auto index the new data of juridical_text 
@receiver(post_save, sender=API)
def update_elasticsearch_index(sender, instance, **kwargs):
    call_command('search_index', '--update')