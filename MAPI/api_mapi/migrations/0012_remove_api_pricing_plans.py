# Generated by Django 5.0.3 on 2024-03-15 13:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api_mapi", "0011_remove_api_pricingplans_api_base_link_api_logo_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="api",
            name="pricing_plans",
        ),
    ]
