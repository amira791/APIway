from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import *

class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = '__all__'

    def create(self, validated_data):
      
     password = validated_data.pop('FRpassword')  # Remove password from validated data
     user = Consommateur.objects.create(**validated_data)
     user.set_password(password)  # Set password securely using Django's method
     user.save()
     return user


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class ConsommateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consommateur
        fields = '__all__'

    def create(self, validated_data):
     password = validated_data.pop('CNpassword')  # Remove password from validated data
     user = Consommateur.objects.create(**validated_data)
     user.set_password(password)  # Set password securely using Django's method
     user.save()
     return user


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