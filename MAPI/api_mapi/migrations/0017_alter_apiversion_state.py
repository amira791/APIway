# Generated by Django 5.0.2 on 2024-04-07 01:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_mapi', '0016_alter_apiversion_api_alter_apiversion_functions_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apiversion',
            name='state',
            field=models.CharField(choices=[('Active', 'Active'), ('Draft', 'Draft'), ('Deprecated', 'Deprecated')], max_length=50),
        ),
    ]
