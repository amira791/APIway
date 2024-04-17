# Generated by Django 5.0.3 on 2024-03-31 15:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api_mapi", "0022_apiendpoint_group"),
    ]

    operations = [
        migrations.CreateModel(
            name="PricingModel",
            fields=[
                ("id_model", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=255)),
                (
                    "period",
                    models.CharField(
                        choices=[("Month", "Month"), ("Year", "Year")], max_length=100
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        help_text="Brief description of the pricing model"
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name="TypeTarif",
            fields=[
                ("id_TypeTarif", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.RenameModel(
            old_name="type",
            new_name="TypeParam",
        ),
        migrations.RenameField(
            model_name="typeparam",
            old_name="id_type",
            new_name="id_TypeParam",
        ),
        migrations.RemoveField(
            model_name="tarification",
            name="period",
        ),
        migrations.AddField(
            model_name="tarification",
            name="features",
            field=models.TextField(default=""),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="tarification",
            name="price",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="tarification",
            name="quota_limit",
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="tarification",
            name="quota_type",
            field=models.CharField(
                choices=[
                    ("Daily", "Daily"),
                    ("Monthly", "Monthly"),
                    ("Yearly", "Yearly"),
                ],
                default="",
                max_length=100,
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="tarification",
            name="rate_limit",
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="tarification",
            name="recommended",
            field=models.BooleanField(default=False, verbose_name="Recommended"),
        ),
        migrations.AlterField(
            model_name="api",
            name="description",
            field=models.CharField(
                help_text="Brief description of the API", max_length=255
            ),
        ),
        migrations.AddField(
            model_name="tarification",
            name="apiVersion",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.DO_NOTHING,
                to="api_mapi.pricingmodel",
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="tarification",
            name="id_type",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.DO_NOTHING,
                to="api_mapi.typetarif",
            ),
            preserve_default=False,
        ),
    ]
