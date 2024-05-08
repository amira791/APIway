from django.contrib import admin
from .models import *
from django.contrib.admin.models import LogEntry

# Register your models here.
admin.site.register(Tarification)
admin.site.register(TypeTarif)
admin.site.register(PricingModel)
admin.site.register(Abonnement)
admin.site.register(API)
admin.site.register(Fournisseur)
admin.site.register(Consommateur)
admin.site.register(APIcategory)
