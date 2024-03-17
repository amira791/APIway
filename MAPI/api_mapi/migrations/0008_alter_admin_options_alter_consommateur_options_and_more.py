# Generated by Django 5.0.3 on 2024-03-17 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_mapi', '0007_alter_admin_options_alter_consommateur_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='admin',
            options={},
        ),
        migrations.AlterModelOptions(
            name='consommateur',
            options={},
        ),
        migrations.AlterModelOptions(
            name='fournisseur',
            options={},
        ),
        migrations.AlterModelManagers(
            name='admin',
            managers=[
            ],
        ),
        migrations.AlterModelManagers(
            name='consommateur',
            managers=[
            ],
        ),
        migrations.AlterModelManagers(
            name='fournisseur',
            managers=[
            ],
        ),
        migrations.RemoveField(
            model_name='admin',
            name='user_ptr',
        ),
        migrations.RemoveField(
            model_name='consommateur',
            name='user_ptr',
        ),
        migrations.RemoveField(
            model_name='fournisseur',
            name='user_ptr',
        ),
        migrations.AddField(
            model_name='admin',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='admin',
            name='password',
            field=models.CharField(default=1, max_length=128, verbose_name='password'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='consommateur',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='consommateur',
            name='password',
            field=models.CharField(default=1, max_length=128, verbose_name='password'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='fournisseur',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='fournisseur',
            name='password',
            field=models.CharField(default=1, max_length=128, verbose_name='password'),
            preserve_default=False,
        ),
    ]
