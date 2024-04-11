from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import *
from django.contrib.auth.hashers import make_password

class FournisseurSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # To handle password securely

    class Meta:
        model = Fournisseur
        fields = ['id_fournisseur', 'FR_first_name', 'FR_last_name', 'FRemail', 'FRusername', 'password', 'FRphone']
        extra_kwargs = {
            'id_fournisseur': {'read_only': True},
            'FRemail': {'required': True},
            'FRusername': {'required': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        instance.set_password(password)
        instance.save()
        return instance




class ConsommateurSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # To handle password securely

    class Meta:
        model = Consommateur
        fields = ['id_consommateur', 'CN_first_name', 'CN_last_name', 'CNemail', 'CNusername', 'password', 'CNphone']
        extra_kwargs = {
            'id_consommateur': {'read_only': True},
            'CNemail': {'required': True},
            'CNusername': {'required': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        instance.set_password(password)
        instance.save()
        return instance


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
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

class TarificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarification
        fields = '__all__'

class AbonnementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abonnement
        fields = '__all__'