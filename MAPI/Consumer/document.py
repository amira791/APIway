from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from elasticsearch_dsl import Index, Text, Keyword, Date, Object
from api_mapi.models import API, APIversion, Functionnality

from django.db.models.signals import post_save, post_delete

@registry.register_document
class APIDocument(Document):
    
    category = fields.ObjectField(
        properties={
            'label': fields.TextField(),
        }
    )
    
    functions = fields.ObjectField(properties={'functName': fields.TextField()})
    
    class Index:
        name = 'api_index'
        settings = {
            'number_of_shards': 1, 
            'number_of_replicas': 0,  
        }
    
    class Django:
        model = API
        fields = ['id_api', 'api_name', 'description', 'logo', 'terms_of_use', 'visibility', 'website']
        related_models = [APIversion]

    def get_instances_from_related(self, related_instance):
        if isinstance(related_instance, APIversion):
            return related_instance.functions.all()

    def prepare_functions(self, instance):
        # Get APIversion instances related to the API
        api_versions = instance.apiversion_set.all()
        
        # Get all functions related to those APIversion instances
        functions = Functionnality.objects.filter(apiversion__in=api_versions)
        
        # Prepare the functions data for indexing
        return [{'functName': func.functName} for func in functions]
    
    