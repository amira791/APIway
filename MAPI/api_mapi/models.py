from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.contrib.auth.models import Group, Permission



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
    


class UserProfileBase(models.Model):
    user = models.OneToOneField(UserBase, on_delete=models.CASCADE, null=True)
    groups = models.ManyToManyField(Group)
    user_permissions = models.ManyToManyField(Permission)

    class Meta:
        abstract = True

    def __str__(self):
        return self.user.username

class Fournisseur(models.Model):
    id_fournisseur = models.AutoField(primary_key=True)
    FR_first_name = models.CharField(max_length=100)
    FR_last_name = models.CharField(max_length=100)
    FRemail = models.CharField(max_length=100)
    FRusername = models.CharField(max_length=100)
    FRpassword = models.CharField(max_length=100)
    FRphone = models.CharField(max_length=100)

    def __str__(self):
        return self.FRusername
    
class Admin(models.Model):
    id_admin = models.AutoField(primary_key=True)
    AdminEmail = models.CharField(max_length=100)
    AdminUsername = models.CharField(max_length=100)
    AdminPassword = models.CharField(max_length=100)

    def __str__(self):
        return self.AdminUsername

class Consommateur(models.Model):
    id_consommateur = models.AutoField(primary_key=True)
    CN_first_name = models.CharField(max_length=100)
    CN_last_name = models.CharField(max_length=100)
    CNemail = models.CharField(max_length=100)
    CNusername = models.CharField(max_length=100)
    CNpassword = models.CharField(max_length=100)
    CNphone = models.CharField(max_length=100)

    def __str__(self):
        return self.CNusername

class APIcategory(models.Model):
    id_category = models.AutoField(primary_key=True)
    label = models.CharField(max_length=100)

    def __str__(self):
        return self.label

class API(models.Model):
    id_api = models.AutoField(primary_key=True)
    api_name = models.CharField(max_length=100)
    description = models.TextField(verbose_name="Description", help_text="Brief description of the API")
    provider = models.ForeignKey(Fournisseur, on_delete=models.DO_NOTHING, verbose_name="Provider")
    category = models.ForeignKey(APIcategory, on_delete=models.DO_NOTHING, verbose_name="Category")
    terms_of_use = models.TextField(verbose_name="Terms of Use", help_text="Terms and conditions for API usage")
    logo = models.ImageField(upload_to="assets/images/", verbose_name="Logo")
    visibility = models.BooleanField(default=False, verbose_name="Visibility")
    website = models.URLField(verbose_name="Website", help_text="API website")

    def __str__(self):
        return self.api_name

class APIversion(models.Model):
    id_version = models.AutoField(primary_key=True)
    num_version = models.CharField(max_length=100, null=True)
    CHOICES = (
        ('Active', 'Active'),
        ('Draft', 'Draft'),
        ('Deprecated', 'Deprecated'),
    )
    state = models.CharField(max_length=50, choices=CHOICES, null=True)
    description = models.TextField(null=True)
    date_version = models.DateField(auto_now=True)
    api = models.ForeignKey(API, on_delete=models.DO_NOTHING, null=True)
    current = models.BooleanField(default=False, verbose_name="Current Version", null=True)
    functions = models.ManyToManyField('Functionnality', null=True)

    def __str__(self):
        return self.num_version

class Functionnality(models.Model):
    id_funct = models.AutoField(primary_key=True)
    functName = models.CharField(max_length=100)

    def __str__(self):
        return self.functName

class APIendpoint(models.Model):
    id_endpoint = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    CHOICES = (
        ('GET', 'GET'),
        ('PUT', 'PUT'),
        ('PATCH', 'PATCH'),
        ('POST', 'POST'),
        ('DELETE','DELETE'),
    )
    method = models.CharField(max_length=20, choices=CHOICES, null=True)
    link = models.TextField()
    group = models.CharField(max_length=255, default="", null=True)
    version = models.ForeignKey(APIversion, on_delete=models.DO_NOTHING)
    description = models.TextField(help_text="Brief description of the endPoint")

    def __str__(self):
        return self.title

class TypeParam(models.Model):
    id_TypeParam = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class ApiHeader(models.Model):
    id_header = models.AutoField(primary_key=True)
    key = models.CharField(max_length=255)
    type_id = models.ForeignKey(TypeParam, on_delete=models.DO_NOTHING)
    example_value = models.CharField(max_length=255)
    required = models.BooleanField(default=False)
    endpoint = models.ForeignKey(APIendpoint, related_name='headers', on_delete=models.CASCADE)

    def __str__(self):
        return self.key

class ApiQueryParam(models.Model):
    id_queryparams = models.AutoField(primary_key=True)
    key = models.CharField(max_length=255)
    type_id = models.ForeignKey(TypeParam, on_delete=models.DO_NOTHING, default=1)
    example_value = models.CharField(max_length=255)
    endpoint = models.ForeignKey(APIendpoint, related_name='query_params', on_delete=models.CASCADE)

    def __str__(self):
        return self.key

class ApiEndpointBody(models.Model):
    id_body = models.AutoField(primary_key=True)
    media_type = models.CharField(max_length=255)
    payload_name = models.CharField(max_length=255)
    payload_description = models.TextField(verbose_name="Payload text", help_text="Payload text")
    body_example = models.TextField(verbose_name="Example", help_text="Example of a body")
    endpoint = models.ForeignKey(APIendpoint, related_name='body', on_delete=models.CASCADE)

    def __str__(self):
        return self.key

class ResponseExample(models.Model):
    id_response = models.AutoField(primary_key=True)
    id_endpoint = models.ForeignKey(APIendpoint, on_delete=models.DO_NOTHING)
    code_status = models.IntegerField()
    title = models.CharField(max_length=100)
    body = models.TextField()

    def __str__(self):
        return self.title

class APIdocumentation(models.Model):
    id_doc = models.AutoField(primary_key=True)
    docLink = models.TextField()
    apiVersion = models.ForeignKey(APIversion, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.id_doc

class PricingModel(models.Model):
    id_model = models.AutoField(primary_key=True)
    api = models.ForeignKey(API, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=255)
    CHOICES = (
        ('Daily', 'Daily'),
        ('Monthly', 'Monthly'),
        ('Yearly', 'Yearly'),
    )
    period = models.CharField(max_length=100, choices=CHOICES)
    description = models.TextField(help_text="Brief description of the pricing model")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class TypeTarif(models.Model):
    id_TypeTarif = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Tarification(models.Model):
    id_tarif = models.AutoField(primary_key=True)
    pricingModel = models.ForeignKey(PricingModel, on_delete=models.DO_NOTHING)
    type = models.ForeignKey(TypeTarif, on_delete=models.DO_NOTHING)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    features = models.TextField()
    quota_limit = models.IntegerField()  # Total limit
    rate_limit = models.IntegerField()  # Per hour
    priceId = models.CharField(max_length= 50)

    def __str__(self):
        return self.pricingModel.name + " " + self.type.name

class Abonnement(models.Model):
    id_subscription = models.AutoField(primary_key=True)
    api_key = models.CharField(max_length=100)
    start_date = models.DateField(auto_now=True)
    end_date = models.DateField(auto_now=True)
    statut = models.CharField(max_length=20)
    consumer = models.ForeignKey(Consommateur, on_delete=models.DO_NOTHING)
    pricing = models.ForeignKey(Tarification, on_delete=models.DO_NOTHING)
    api = models.ForeignKey(API, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.consumer.CNusername + " on " + self.pricing.type.name


class APIForum(models.Model):
    id_forum = models.AutoField(primary_key=True)
    api = models.ForeignKey(API,on_delete= models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.name


class Thread(models.Model):
    id_thread = models.AutoField(primary_key=True)
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    forum = models.ForeignKey(APIForum, on_delete=models.CASCADE)
    creator = models.ForeignKey(Consommateur, on_delete=models.CASCADE)

    def __str__(self):
        return self.content

class Post(models.Model):
    id_post = models.AutoField(primary_key=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    created_by = models.ForeignKey(Consommateur, on_delete=models.CASCADE)

    def __str__(self):
        return self.message
    
class Ticket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    api_id = models.ForeignKey(API, on_delete=models.CASCADE)
    created_by = models.ForeignKey(Consommateur, on_delete=models.CASCADE)
    issue = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('open', 'Open'), ('closed', 'Closed')], default='open')


class Type(models.Model):
    id_type = models.AutoField(primary_key=True)
    name= models.CharField(max_length=100)
    def __str__(self):
        return self.title



class Endpoint_parameter(models.Model):
    id_parameter = models.AutoField(primary_key=True)
    id_endpoint = models.ForeignKey(API, on_delete=models.DO_NOTHING )
    name= models.CharField(max_length=100)
    type_id = models.ForeignKey(Type, on_delete=models.DO_NOTHING )
    required = models.BooleanField
    deleted = models.BooleanField
    def __str__(self):
        return self.title