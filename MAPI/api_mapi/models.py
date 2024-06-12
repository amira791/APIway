from django.db import models
from django.utils import timezone 
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
    id_fournisseur = models.AutoField(primary_key=True)
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
    description = models.TextField(verbose_name="Description",help_text="Brief description of the API")
    provider = models.ForeignKey(Fournisseur, on_delete=models.DO_NOTHING, verbose_name="Provider")
    category = models.ForeignKey(APIcategory, on_delete=models.DO_NOTHING, verbose_name="Category")
    terms_of_use = models.TextField(verbose_name="Terms of Use", help_text="Terms and conditions for API usage")
    logo = models.ImageField(upload_to="assets/images/", verbose_name="Logo")
    visibility = models.BooleanField(default=False, verbose_name="Visibility")
    website = models.URLField(verbose_name="Website", help_text="API website")
    """ pricing_plans = models.ManyToManyField('Tarification', verbose_name="Pricing Plans") """

    def __str__(self):
        return self.api_name

class APIversion(models.Model):
    id_version = models.AutoField(primary_key=True)
    num_version= models.CharField(max_length=100, null=True)
    CHOICES = (
        ('Active', 'Active'),
        ('Draft', 'Draft'),
        ('Deprecated', 'Deprecated'),
    )
    state = models.CharField(max_length=50, choices=CHOICES, null=True)
    description = models.TextField(null = True)  # Added parentheses
    date_version = models.DateField(auto_now=True)
    api = models.ForeignKey(API, on_delete=models.DO_NOTHING, null=True )
    current = models.BooleanField(default=False, verbose_name="Current Version", null = True)
    functions = models.ManyToManyField('Functionnality', null=True)
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
    path= models.TextField(default="/")
    group=models.CharField(max_length=255,default="",  null=True)
    version = models.ForeignKey(APIversion, on_delete=models.DO_NOTHING )
    description = models.TextField( help_text="Brief description of the endPoint")   
    def __str__(self):
        return self.title
class TypeParam(models.Model):
    id_TypeParam = models.AutoField(primary_key=True)
    name= models.CharField(max_length=100)
    def __str__(self):
        return self.name
class ApiHeader(models.Model):
    id_header =models.AutoField(primary_key=True)
    key = models.CharField(max_length=255)
    example_value = models.CharField(max_length=255, null=True)
    required = models.BooleanField(default=False)
    endpoint = models.ForeignKey(APIendpoint, related_name='headers', on_delete=models.CASCADE)
    def __str__(self):
        return self.key

class ApiQueryParam(models.Model):
    id_queryparams =models.AutoField(primary_key=True)
    key = models.CharField(max_length=255)
    type_id = models.ForeignKey(TypeParam, on_delete=models.DO_NOTHING,default=1)
    example_value = models.CharField(max_length=255, null=True)
    required = models.BooleanField(default=False)
    endpoint = models.ForeignKey(APIendpoint, related_name='query_params', on_delete=models.CASCADE)
    def __str__(self):
        return self.key

class ApiEndpointBody(models.Model):
    id_body =models.AutoField(primary_key=True)
    media_type = models.CharField(max_length=255)
    body_example = models.TextField(verbose_name="Example", help_text="Example of a body", null=True)
    endpoint = models.ForeignKey(APIendpoint, related_name='body', on_delete=models.CASCADE)
  
    def __str__(self):
        return self.media_type
       
class Endpoint_parameter(models.Model):
    id_parameter = models.AutoField(primary_key=True)
    id_endpoint = models.ForeignKey(APIendpoint, on_delete=models.DO_NOTHING )
    name= models.CharField(max_length=100)
    type_id = models.ForeignKey(TypeParam, on_delete=models.DO_NOTHING,default=1  )
    example_value = models.CharField(max_length=255, null=True)
    required = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)
    def __str__(self):
        return self.name
class Functionnality(models.Model):
    id_funct= models.AutoField(primary_key=True)
    functName = models.CharField(max_length=100)
 
    def __str__(self):
        return self.functName
class ResponseExample(models.Model):
    id_response = models.AutoField(primary_key=True)
    id_endpoint = models.ForeignKey(APIendpoint, on_delete=models.DO_NOTHING )
    code_status = models.IntegerField( null=True)
    title = models.CharField(max_length=100, null=True)
    body = models.TextField( null=True)
  
    def __str__(self):
        return self.title

class APIdocumentation(models.Model):
    id_doc= models.AutoField(primary_key=True)
    docLink = models.TextField
    apiVersion = models.ForeignKey(APIversion, on_delete=models.DO_NOTHING )
    def __str__(self):
        return self.id_doc
    

class PricingModel(models.Model):
    id_model= models.AutoField(primary_key=True)
    api = models.ForeignKey(API, on_delete=models.DO_NOTHING )
    name = models.CharField(max_length=255)
    CHOICES = (
         ('Daily', 'Daily'),
        ('Monthly', 'Monthly'),
        ('Yearly', 'Yearly'),
    )
    period = models.CharField(max_length=100, choices=CHOICES)
    description = models.TextField( help_text="Brief description of the pricing model")
    is_active = models.BooleanField(default=True)   
    def __str__(self):
        return self.name


class TypeTarif(models.Model):
    id_TypeTarif = models.AutoField(primary_key=True)
    name= models.CharField(max_length=100)
    def __str__(self):
        return self.name   
class Tarification(models.Model):
    id_tarif= models.AutoField(primary_key=True)
    pricingModel = models.ForeignKey(PricingModel, on_delete=models.DO_NOTHING )
    type = models.ForeignKey(TypeTarif, on_delete=models.DO_NOTHING )
    price = models.DecimalField(max_digits=10, decimal_places=2)
    features = models.TextField()
    quota_limit = models.IntegerField() #Total limit
    rate_limit = models.IntegerField(null = True) #Per hour
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
    quota_remaining = models.IntegerField(default=0)
    def save(self, *args, **kwargs):
        if not self.pk:  # Only set quota_remaining when creating the subscription
            self.quota_remaining = self.pricing.quota_limit
        super().save(*args, **kwargs)
    def __str__(self):
        return self.id_subscription
    

class APIUsage(models.Model):
    subscription = models.ForeignKey(Abonnement, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)
    status_code = models.IntegerField()
    response_time = models.FloatField()  # Response time in seconds
    endpoint = models.ForeignKey(APIendpoint, on_delete=models.DO_NOTHING )
    def __str__(self):
        return str( self.status_code)