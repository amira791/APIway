# Generated by Django 4.2.1 on 2024-05-28 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_mapi', '0009_alter_ticketresponse_options_alter_ticket_status_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userbase',
            name='picture',
            field=models.ImageField(null=True, upload_to='assets/images/users', verbose_name='Picture'),
        ),
    ]
