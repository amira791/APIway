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

class Fournisseur(UserProfileBase):
    id_fournisseur = models.AutoField(primary_key=True)

class Admin(UserProfileBase):
    id_admin = models.AutoField(primary_key=True)

class Consommateur(UserProfileBase):
    id_consommateur = models.AutoField(primary_key=True)
# class Fournisseur(User):
#     id_fournisseur = models.AutoField(primary_key=True)
#     FR_first_name = models.CharField(max_length=100)
#     FR_last_name = models.CharField(max_length=100)
#     FRemail = models.CharField(max_length=100)
#     FRusername = models.CharField(max_length=100)
#     FRpassword = models.CharField(max_length=100)
#     FRphone = models.CharField(max_length=100)
#     FRstatus = models.CharField(max_length=100)

#     def __str__(self):
#         return self.FRusername
    
# class Admin(User):
#     id_admin = models.AutoField(primary_key=True)
#     AdminEmail = models.CharField(max_length=100)
#     AdminUsername = models.CharField(max_length=100)
#     AdminEmail = models.CharField(max_length=100)
#     AdminUsername = models.CharField(max_length=100)
#     AdminPassword = models.CharField(max_length=100)

#     def __str__(self):
#         return self.AdminUsername

# class Consommateur(User):
#     id_consommateur = models.AutoField(primary_key=True)
#     CN_first_name = models.CharField(max_length=100)
#     CN_last_name = models.CharField(max_length=100)
#     CNemail = models.CharField(max_length=100)
#     CNusername = models.CharField(max_length=100)
#     CNpassword = models.CharField(max_length=100)
#     CNphone = models.CharField(max_length=100)
#     CNstatus = models.CharField(max_length=100)

#     def __str__(self):
#         return self.CNusername

class APIcategory(models.Model):
    id_category = models.AutoField(primary_key=True)
    label = models.CharField(max_length=100)

    def __str__(self):
        return self.label
    

class API(models.Model):
    id_api = models.AutoField(primary_key=True)
    api_name = models.CharField(max_length=100, blank = True)
    description = models.CharField(max_length=100, help_text="Brief description of the API", blank = True)
    provider = models.ForeignKey(Fournisseur, on_delete=models.DO_NOTHING, verbose_name="Provider", null = True)
    category = models.ForeignKey(APIcategory, on_delete=models.DO_NOTHING, related_name="Category", null = True)
    terms_of_use = models.TextField(verbose_name="Terms of Use", help_text="Terms and conditions for API usage", blank = True)
    logo = models.ImageField(upload_to="assets/images/", verbose_name="Logo", null = True)
    visibility = models.BooleanField(default=False, verbose_name="Visibility", null = True)
    website = models.TextField(verbose_name="Web Site", help_text="Base link for API ", blank = True)
    
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