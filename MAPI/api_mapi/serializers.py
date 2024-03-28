from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import *

class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = '__all__'
    def save(self,**kwargs):
        
        new_user = Fournisseur.objects.create(
            FRusername= self.validated_data['username'],
            FRemail=self.validated_data['email'],
            FRpassword= self.validated_data['password'],)
        new_user.save()
        Token.objects.create(User=new_user)
    
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class ConsommateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consommateur
        fields = '__all__'
    def save(self,**kwargs):
        new_user = Consommateur.objects.create(
            CNusername= self.validated_data['username'],
            CNemail=self.validated_data['email'],
            CNpassword= self.validated_data['password'],)
        new_user.save()
        Token.objects.create(User=new_user)

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