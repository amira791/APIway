# Generated by Django 4.2.1 on 2024-04-26 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_mapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='title',
            field=models.CharField(default=1, max_length=500),
            preserve_default=False,
        ),
    ]
