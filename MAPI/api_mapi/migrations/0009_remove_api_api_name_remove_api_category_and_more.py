# Generated by Django 5.0.3 on 2024-03-14 23:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api_mapi", "0008_remove_api_terme_of_use"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="api",
            name="api_name",
        ),
        migrations.RemoveField(
            model_name="api",
            name="category",
        ),
        migrations.RemoveField(
            model_name="api",
            name="description",
        ),
        migrations.RemoveField(
            model_name="api",
            name="pricingPlans",
        ),
        migrations.RemoveField(
            model_name="api",
            name="provider",
        ),
    ]
