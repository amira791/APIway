# Generated by Django 5.0.3 on 2024-05-20 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_mapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='consommateur',
            name='CN_first_name',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='consommateur',
            name='CN_last_name',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='consommateur',
            name='CNemail',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='consommateur',
            name='CNpassword',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='consommateur',
            name='CNphone',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='consommateur',
            name='CNstatus',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='consommateur',
            name='CNusername',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='fournisseur',
            name='FR_first_name',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='fournisseur',
            name='FR_last_name',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='fournisseur',
            name='FRemail',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='fournisseur',
            name='FRpassword',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='fournisseur',
            name='FRphone',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='fournisseur',
            name='FRstatus',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='fournisseur',
            name='FRusername',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
    ]
