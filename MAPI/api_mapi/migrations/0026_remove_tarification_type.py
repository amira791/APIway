# Generated by Django 5.0.3 on 2024-04-04 16:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api_mapi", "0025_pricingmodel_id_api"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="tarification",
            name="type",
        ),
    ]
