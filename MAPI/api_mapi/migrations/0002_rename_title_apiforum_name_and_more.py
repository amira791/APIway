# Generated by Django 5.0.3 on 2024-03-31 15:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api_mapi', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='apiforum',
            old_name='title',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='thread',
            old_name='title',
            new_name='content',
        ),
    ]
