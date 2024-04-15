from django.contrib import admin
# from .models import  Fournisseur, Consommateur
from .models import UserBase, Fournisseur, Consommateur, APIcategory, API, APIversion, APIendpoint, Functionnality, APIdocumentation, Tarification, Abonnement

admin.site.register(UserBase)
admin.site.register(Fournisseur)
admin.site.register(Consommateur)
admin.site.register(APIcategory)
admin.site.register(API)
admin.site.register(APIversion)
admin.site.register(APIendpoint)
admin.site.register(Functionnality)
admin.site.register(APIdocumentation)
admin.site.register(Tarification)
admin.site.register(Abonnement)
