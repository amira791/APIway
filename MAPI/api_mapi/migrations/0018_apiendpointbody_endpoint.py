# Generated by Django 5.0.3 on 2024-03-29 01:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api_mapi", "0017_apiendpointbody"),
    ]

    operations = [
        migrations.AddField(
            model_name="apiendpointbody",
            name="endpoint",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="body",
                to="api_mapi.apiendpoint",
            ),
            preserve_default=False,
        ),
    ]
