from django.db import models
from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.contrib.auth.models import Group, Permission
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserBase(AbstractUser):
    email = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

class Fournisseur(models.Model):
    id_fournisseur = models.AutoField(primary_key=True)

    groups = models.ManyToManyField(Group, related_name='fournisseur_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='fournisseur_user_permissions')

    # One-to-one relationship with UserBase
    user = models.OneToOneField(UserBase, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Admin(models.Model):
    id_admin = models.AutoField(primary_key=True)

    groups = models.ManyToManyField(Group, related_name='admin_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='admin_user_permissions')

    # One-to-one relationship with UserBase
    user = models.OneToOneField(UserBase, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Consommateur(models.Model):
    id_consommateur = models.AutoField(primary_key=True)

    groups = models.ManyToManyField(Group, related_name='consommateur_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='consommateur_user_permissions')

    # One-to-one relationship with UserBase
    user = models.OneToOneField(UserBase, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
  


class APIcategory(models.Model):
    id_category = models.AutoField(primary_key=True)
    label = models.CharField(max_length=100)

    def __str__(self):
        return self.label
    

class API(models.Model):
    id_api = models.AutoField(primary_key=True)
    api_name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    price = models.FloatField
    provider = models.ForeignKey(Fournisseur, on_delete=models.DO_NOTHING )
    category = models.ForeignKey(APIcategory, on_delete=models.DO_NOTHING )
    pricingPlans = models.ManyToManyField('Tarification')  
    def __str__(self):
        return self.api_name
    
class APIversion(models.Model):
    id_version = models.AutoField(primary_key=True)
    num_version= models.CharField(max_length=100)
    CHOICES = (
        ('Alpha', 'Alpha'),  
        ('Beta', 'Beta'),
        ('Stable', 'Stable'),
        ('Deprecated', 'Deprecated'),
        ('Obsolete', 'Obsolete'),
    )
    state = models.CharField(max_length=50, choices=CHOICES)
    description = models.TextField
    date_version = models.DateField(auto_now=True)
    api = models.ForeignKey(API, on_delete=models.DO_NOTHING )
    functions = models.ManyToManyField('Functionnality')
    def __str__(self):
        return self.num_version
    
class APIendpoint(models.Model):
    id_endpoint = models.AutoField(primary_key=True)
    title= models.CharField(max_length=100)
    CHOICES = (
        ('GET', 'GET'),
        ('PUT', 'PUT'),
        ('PATCH', 'PATCH'),
        ('POST', 'POST'),
        ('DELETE','DELETE'),
    )
    method = models.CharField(max_length=20, choices=CHOICES, null=True)  
    link= models.TextField
    api = models.ForeignKey(API, on_delete=models.DO_NOTHING )
    version = models.ForeignKey(APIversion, on_delete=models.DO_NOTHING )
    def __str__(self):
        return self.title

class Functionnality(models.Model):
    id_funct= models.AutoField(primary_key=True)
    functName = models.CharField(max_length=100)
    funct_descrip = models.CharField(max_length=100)
    def __str__(self):
        return self.functName

class APIdocumentation(models.Model):
    id_doc= models.AutoField(primary_key=True)
    docLink = models.TextField
    apiVersion = models.ForeignKey(APIversion, on_delete=models.DO_NOTHING )
    def __str__(self):
        return self.id_doc
    
class Tarification(models.Model):
    id_tarif= models.AutoField(primary_key=True)
    type = models.CharField(max_length=100)
    CHOICES = (
        ('Month', 'Month'),
        ('Year', 'Year'),
    )
    period = models.CharField(max_length=100, choices=CHOICES)
    def __str__(self):
        return self.id_tarif

class Abonnement(models.Model):
    id_subscription = models.AutoField(primary_key=True)
    api_key = models.CharField(max_length=100)
    start_date = models.DateField(auto_now=True)
    end_date = models.DateField(auto_now=True)
    consumer = models.ForeignKey(Consommateur, on_delete=models.DO_NOTHING )
    pricing = models.ForeignKey(Tarification, on_delete=models.DO_NOTHING )
    api = models.ForeignKey(API, on_delete=models.DO_NOTHING )

    def __str__(self):
        return self.id_subscription