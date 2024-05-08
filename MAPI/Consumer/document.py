from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from elasticsearch_dsl import Index, Text ,Keyword, Date, Object
from api_mapi.models import *


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
        fields = ['id_api', 'api_name', 'description','logo',
                   'terms_of_use', 'visibility', 'website']
       
        related_models = [Functionnality]

    def get_instances_from_related(self, related_instance):
        if isinstance(related_instance, Functionnality):
            return related_instance.api_set.all()

    def prepare_functions(self, instance):
     apiversion = instance.apiversion_set.first()
     if apiversion:
        return [{'functName': func.functName} for func in apiversion.functions.all()]
