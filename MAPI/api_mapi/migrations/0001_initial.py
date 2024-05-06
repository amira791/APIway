# Generated by Django 5.0.3 on 2024-05-05 23:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Admin",
            fields=[
                ("id_admin", models.AutoField(primary_key=True, serialize=False)),
                ("AdminEmail", models.CharField(max_length=100)),
                ("AdminUsername", models.CharField(max_length=100)),
                ("AdminPassword", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="APIcategory",
            fields=[
                ("id_category", models.AutoField(primary_key=True, serialize=False)),
                ("label", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="APIendpoint",
            fields=[
                ("id_endpoint", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=100)),
                (
                    "method",
                    models.CharField(
                        choices=[
                            ("GET", "GET"),
                            ("PUT", "PUT"),
                            ("PATCH", "PATCH"),
                            ("POST", "POST"),
                            ("DELETE", "DELETE"),
                        ],
                        max_length=20,
                        null=True,
                    ),
                ),
                ("group", models.CharField(default="", max_length=255, null=True)),
                (
                    "description",
                    models.TextField(help_text="Brief description of the endPoint"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="BaseLink",
            fields=[
                ("baselink_id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "url",
                    models.TextField(
                        help_text="Base link for API endpoints",
                        verbose_name="Base Link URL",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Consommateur",
            fields=[
                ("id_fournisseur", models.AutoField(primary_key=True, serialize=False)),
                ("CN_first_name", models.CharField(max_length=100)),
                ("CN_last_name", models.CharField(max_length=100)),
                ("CNemail", models.CharField(max_length=100)),
                ("CNusername", models.CharField(max_length=100)),
                ("CNpassword", models.CharField(max_length=100)),
                ("CNphone", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Fournisseur",
            fields=[
                ("id_fournisseur", models.AutoField(primary_key=True, serialize=False)),
                ("FR_first_name", models.CharField(max_length=100)),
                ("FR_last_name", models.CharField(max_length=100)),
                ("FRemail", models.CharField(max_length=100)),
                ("FRusername", models.CharField(max_length=100)),
                ("FRpassword", models.CharField(max_length=100)),
                ("FRphone", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Functionnality",
            fields=[
                ("id_funct", models.AutoField(primary_key=True, serialize=False)),
                ("functName", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="TypeParam",
            fields=[
                ("id_TypeParam", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="TypeTarif",
            fields=[
                ("id_TypeTarif", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="API",
            fields=[
                ("id_api", models.AutoField(primary_key=True, serialize=False)),
                ("api_name", models.CharField(max_length=100)),
                (
                    "description",
                    models.TextField(
                        help_text="Brief description of the API",
                        verbose_name="Description",
                    ),
                ),
                (
                    "terms_of_use",
                    models.TextField(
                        help_text="Terms and conditions for API usage",
                        verbose_name="Terms of Use",
                    ),
                ),
                (
                    "logo",
                    models.ImageField(upload_to="assets/images/", verbose_name="Logo"),
                ),
                (
                    "visibility",
                    models.BooleanField(default=False, verbose_name="Visibility"),
                ),
                (
                    "website",
                    models.URLField(help_text="API website", verbose_name="Website"),
                ),
                (
                    "category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.apicategory",
                        verbose_name="Category",
                    ),
                ),
                (
                    "provider",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.fournisseur",
                        verbose_name="Provider",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ApiEndpointBody",
            fields=[
                ("id_body", models.AutoField(primary_key=True, serialize=False)),
                ("media_type", models.CharField(max_length=255)),
                ("payload_name", models.CharField(max_length=255)),
                (
                    "payload_description",
                    models.TextField(
                        help_text="Payload text", verbose_name="Payload text"
                    ),
                ),
                (
                    "body_example",
                    models.TextField(
                        help_text="Example of a body", verbose_name="Example"
                    ),
                ),
                (
                    "endpoint",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="body",
                        to="api_mapi.apiendpoint",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="APIversion",
            fields=[
                ("id_version", models.AutoField(primary_key=True, serialize=False)),
                ("num_version", models.CharField(max_length=100, null=True)),
                (
                    "state",
                    models.CharField(
                        choices=[
                            ("Active", "Active"),
                            ("Draft", "Draft"),
                            ("Deprecated", "Deprecated"),
                        ],
                        max_length=50,
                        null=True,
                    ),
                ),
                ("description", models.TextField()),
                ("date_version", models.DateField(auto_now=True)),
                (
                    "current",
                    models.BooleanField(
                        default=False, null=True, verbose_name="Current Version"
                    ),
                ),
                (
                    "api",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.api",
                    ),
                ),
                (
                    "base_links",
                    models.ManyToManyField(
                        blank=True, to="api_mapi.baselink", verbose_name="Base Links"
                    ),
                ),
                (
                    "functions",
                    models.ManyToManyField(null=True, to="api_mapi.functionnality"),
                ),
            ],
        ),
        migrations.AddField(
            model_name="apiendpoint",
            name="version",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.DO_NOTHING, to="api_mapi.apiversion"
            ),
        ),
        migrations.CreateModel(
            name="APIdocumentation",
            fields=[
                ("id_doc", models.AutoField(primary_key=True, serialize=False)),
                (
                    "apiVersion",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.apiversion",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="PricingModel",
            fields=[
                ("id_model", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=255)),
                (
                    "period",
                    models.CharField(
                        choices=[
                            ("Daily", "Daily"),
                            ("Monthly", "Monthly"),
                            ("Yearly", "Yearly"),
                        ],
                        max_length=100,
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        help_text="Brief description of the pricing model"
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                (
                    "api",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.api",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ResponseExample",
            fields=[
                ("id_response", models.AutoField(primary_key=True, serialize=False)),
                ("code_status", models.IntegerField()),
                ("title", models.CharField(max_length=100)),
                ("body", models.TextField()),
                (
                    "id_endpoint",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.apiendpoint",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Tarification",
            fields=[
                ("id_tarif", models.AutoField(primary_key=True, serialize=False)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("features", models.TextField()),
                ("quota_limit", models.IntegerField()),
                ("rate_limit", models.IntegerField()),
                (
                    "pricingModel",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.pricingmodel",
                    ),
                ),
                (
                    "type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.typetarif",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Abonnement",
            fields=[
                (
                    "id_subscription",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                ("api_key", models.CharField(max_length=100)),
                ("start_date", models.DateField(auto_now=True)),
                ("end_date", models.DateField(auto_now=True)),
                (
                    "api",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.api",
                    ),
                ),
                (
                    "consumer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.consommateur",
                    ),
                ),
                (
                    "pricing",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.tarification",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Endpoint_parameter",
            fields=[
                ("id_parameter", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
                ("example_value", models.CharField(max_length=255)),
                ("required", models.BooleanField(default=False)),
                ("deleted", models.BooleanField(default=False)),
                (
                    "id_endpoint",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.apiendpoint",
                    ),
                ),
                (
                    "type_id",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.typeparam",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ApiQueryParam",
            fields=[
                ("id_queryparams", models.AutoField(primary_key=True, serialize=False)),
                ("key", models.CharField(max_length=255)),
                ("example_value", models.CharField(max_length=255)),
                (
                    "endpoint",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="query_params",
                        to="api_mapi.apiendpoint",
                    ),
                ),
                (
                    "type_id",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.typeparam",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ApiHeader",
            fields=[
                ("id_header", models.AutoField(primary_key=True, serialize=False)),
                ("key", models.CharField(max_length=255)),
                ("example_value", models.CharField(max_length=255)),
                ("required", models.BooleanField(default=False)),
                (
                    "endpoint",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="headers",
                        to="api_mapi.apiendpoint",
                    ),
                ),
                (
                    "type_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api_mapi.typeparam",
                    ),
                ),
            ],
        ),
    ]
