# Generated by Django 5.0.3 on 2024-03-30 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api_mapi", "0021_remove_apiendpoint_api_endpoint_parameter_deleted_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="apiendpoint",
            name="group",
            field=models.CharField(default="", max_length=255, null=True),
        ),
    ]
