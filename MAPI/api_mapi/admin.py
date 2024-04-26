from django.contrib import admin
from .models import *
from django.contrib.admin.models import LogEntry

# Register your models here.
admin.site.register(UserBase)
admin.site.register(LogEntry)
admin.site.register(Consommateur)
admin.site.register(Fournisseur)
admin.site.register(API)
admin.site.register(APIForum)
admin.site.register(Thread)
admin.site.register(Comment)

