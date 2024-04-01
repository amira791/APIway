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

class ThreadSerializer(serializers.ModelSerializer):
    creator = ConsommateurSerializer()  
    num_posts = serializers.SerializerMethodField()
    class Meta:
        model = Thread
        fields = '__all__'
        
    def get_num_posts(self, obj):
        return Post.objects.filter(thread=obj.id_thread).count()
    #to-do
        # define the craetor as connected user , current user
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        #to-do
        # define the craetor as connected user , current user
class TarificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarification
        fields = '__all__'

class AbonnementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abonnement
        fields = '__all__'