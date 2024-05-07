from rest_framework import serializers
from .models import *

class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class ConsommateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consommateur
        fields = '__all__'

class APIcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = APIcategory
        fields = '__all__'

class APISerializer(serializers.ModelSerializer):
    category_label = serializers.CharField(source='category.label', read_only=True)
    logo = serializers.ImageField(required=False)
    class Meta:
        model = API
        fields = ['id_api', 'api_name', 'description', 'provider', 'category', 'category_label', 'terms_of_use', 'logo', 'visibility', 'website']

class APIversionSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIversion
        fields = '__all__'

class APIendpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIendpoint
        fields = '__all__'

class FunctionnalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Functionnality
        fields = '__all__'

class APIdocumentationSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIdocumentation
        fields = '__all__'

class TarificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarification
        fields = '__all__'

class AbonnementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abonnement
        fields = '__all__'

        
class TypeParamSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeParam
        fields = '__all__'
        
class TypeTarifSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeTarif
        fields = '__all__'

class TarificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarification
        fields = '__all__'
class PricingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingModel
        fields = '__all__'
                    
class Endpoint_parameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endpoint_parameter
        fields = '__all__'


      
class ApiHeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiHeader
        fields = '__all__'
        
      
class ApiQueryParamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiQueryParam
        fields = '__all__'

class ApiEndpointBodySerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiEndpointBody
        fields = '__all__'

class BaseLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseLink
        fields = '__all__'

class ResponseExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponseExample
        fields = '__all__'