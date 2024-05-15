# Generated by Django 4.2.1 on 2024-05-15 12:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_mapi', '0003_abonnement_statut_tarification_priceid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pricingmodel',
            name='api',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api_mapi.api'),
        ),
        migrations.AlterField(
            model_name='pricingmodel',
            name='description',
            field=models.TextField(blank=True, help_text='Brief description of the pricing model'),
        ),
        migrations.AlterField(
            model_name='pricingmodel',
            name='name',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='pricingmodel',
            name='period',
            field=models.CharField(blank=True, choices=[('Daily', 'Daily'), ('Monthly', 'Monthly'), ('Yearly', 'Yearly')], max_length=100),
        ),
    ]
