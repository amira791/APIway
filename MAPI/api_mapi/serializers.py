from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import *
from django.contrib.auth.hashers import make_password


from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Fournisseur, Admin, Consommateur

class UniqueUsernameValidator:
    def __call__(self, value):
        if Fournisseur.objects.filter(username=value).exists() or \
           Admin.objects.filter(username=value).exists() or \
           Consommateur.objects.filter(username=value).exists():
            raise ValidationError('This username is already in use.')

class UniqueEmailValidator:
    def __call__(self, value):
        if Fournisseur.objects.filter(email=value).exists() or \
           Admin.objects.filter(email=value).exists() or \
           Consommateur.objects.filter(email=value).exists():
            raise ValidationError('This email address is already in use.')

class FournisseurSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[UniqueUsernameValidator()])
    email = serializers.EmailField(validators=[UniqueEmailValidator()])

    class Meta:
        model = Fournisseur
        fields = ['email', 'username', 'password', 'first_name', 'last_name', 'phone']

class AdminSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[UniqueUsernameValidator()])
    email = serializers.EmailField(validators=[UniqueEmailValidator()])

    class Meta:
        model = Admin
        fields = ['email', 'username', 'password']

class ConsommateurSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[UniqueUsernameValidator()])
    email = serializers.EmailField(validators=[UniqueEmailValidator()])

    class Meta:
        model = Consommateur
        fields = ['email', 'username', 'password', 'first_name', 'last_name', 'phone']



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