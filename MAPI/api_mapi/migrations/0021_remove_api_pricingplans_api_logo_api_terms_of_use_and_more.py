# Generated by Django 5.0.3 on 2024-04-16 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_mapi', '0020_remove_api_pricingplans_api_logo_api_terms_of_use_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='api',
            name='pricingPlans',
        ),
        migrations.AddField(
            model_name='api',
            name='logo',
            field=models.ImageField(null=True, upload_to='assets/images/', verbose_name='Logo'),
        ),
        migrations.AddField(
            model_name='api',
            name='terms_of_use',
            field=models.TextField(blank=True, help_text='Terms and conditions for API usage', verbose_name='Terms of Use'),
        ),
        migrations.AddField(
            model_name='api',
            name='visibility',
            field=models.BooleanField(default=False, null=True, verbose_name='Visibility'),
        ),
        migrations.AddField(
            model_name='api',
            name='website',
            field=models.TextField(blank=True, help_text='Base link for API ', verbose_name='Web Site'),
        ),
    ]
