# Generated by Django 5.0.3 on 2024-03-13 14:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api_mapi", "0006_alter_apiendpoint_method"),
    ]

    operations = [
        migrations.CreateModel(
            name="type",
            fields=[
                ("id_type", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name="api",
            name="terme_of_use",
            field=models.CharField(default="", max_length=1000),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name="Endpoint_parameter",
            fields=[
                ("id_parameter", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
                (
                    "id_endpoint",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.api",
                    ),
                ),
                (
                    "type_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.type",
                    ),
                ),
            ],
        ),
    ]
