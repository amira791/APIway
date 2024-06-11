from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'phone','picture', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class FournisseurSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Fournisseur
        fields = ['id_fournisseur', 'user']  

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class ConsommateurSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Consommateur
        fields = ['id_consommateur', 'user']
        

class APIcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = APIcategory
        fields = '__all__'

class APISerializer(serializers.ModelSerializer):
    category_label = serializers.CharField(source='category.label', read_only=True)
    logo = serializers.ImageField(required=False)
    class Meta:
        model = API
        fields = '__all__'
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
class APIForumSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIForum
        fields = '__all__'

class ThreadReadSerializer(serializers.ModelSerializer):
    creator = ConsommateurSerializer()  # Include all details of Consommateur for read operation
    num_posts = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = '__all__'
        
    def get_num_posts(self, obj):
        return Comment.objects.filter(thread=obj.id_thread).count()


class ThreadWriteSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(queryset=Consommateur.objects.all())  # Use only the ID for write operation

    class Meta:
        model = Thread
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')  # Make it read-only
    creator_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = '__all__'

    def get_creator_details(self, obj):
        creator = obj.created_by
        return {
            'username': creator.username,
            'first_name': creator.first_name,
            'last_name': creator.last_name,
            'email': creator.email,
        }
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')
        if request and request.method == 'POST':  # Exclude created_by only for POST requests
            fields.pop('created_by', None)
        return fields

class TicketSerializer(serializers.ModelSerializer):
    api_info = APISerializer(source='api_id', read_only=True)
    user_info = ConsommateurSerializer(source='created_by', read_only=True)
    num_responses = serializers.SerializerMethodField()
    class Meta:
        model = Ticket
        fields = '__all__'

    def get_num_responses(self, obj):
     return TicketResponse.objects.filter(ticket=obj.ticket_id).count()
class TicketResponseSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.id')  
    creator_details = serializers.SerializerMethodField()

    class Meta:
        model = TicketResponse
        fields = '__all__'
        read_only_fields = ['id', 'created_at']
    
    def get_creator_details(self, obj):
        creator = obj.created_by
        return {
            'username' : creator.username,
            'first_name': creator.first_name,
            'last_name': creator.last_name,
            'email': creator.email,
        }
    

    


class TarificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarification
        fields = '__all__'

class AbonnementSerializer(serializers.ModelSerializer):
    api_info = APISerializer(source='api', read_only=True)
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