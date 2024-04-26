from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'phone', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = ['id_fournisseur', 'user']

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['id_admin', 'user']

class ConsommateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consommateur
        fields = ['id_consommateur', 'user']
        
# class FournisseurSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Fournisseur
#         fields = '__all__'
    
    
# class AdminSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Admin
#         fields = '__all__'

# class ConsommateurSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Consommateur
#         fields = '__all__'
    

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

    #to-do
        # define the craetor as connected user , current user
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        #to-do
        # define the craetor as connected user , current user

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class TarificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarification
        fields = '__all__'

class AbonnementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abonnement
        fields = '__all__'

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'
        
        
class Endpoint_parameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endpoint_parameter
        fields = '__all__'