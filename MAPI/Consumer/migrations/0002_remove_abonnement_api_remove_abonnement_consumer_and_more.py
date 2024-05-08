# Generated by Django 5.0.5 on 2024-05-07 19:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Consumer', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='abonnement',
            name='api',
        ),
        migrations.RemoveField(
            model_name='abonnement',
            name='consumer',
        ),
        migrations.RemoveField(
            model_name='abonnement',
            name='pricing',
        ),
        migrations.DeleteModel(
            name='Admin',
        ),
        migrations.RemoveField(
            model_name='api',
            name='category',
        ),
        migrations.RemoveField(
            model_name='api',
            name='provider',
        ),
        migrations.RemoveField(
            model_name='pricingmodel',
            name='api',
        ),
        migrations.RemoveField(
            model_name='apiversion',
            name='api',
        ),
        migrations.RemoveField(
            model_name='apidocumentation',
            name='apiVersion',
        ),
        migrations.RemoveField(
            model_name='apiendpoint',
            name='version',
        ),
        migrations.RemoveField(
            model_name='apiheader',
            name='endpoint',
        ),
        migrations.RemoveField(
            model_name='apiqueryparam',
            name='endpoint',
        ),
        migrations.RemoveField(
            model_name='responseexample',
            name='id_endpoint',
        ),
        migrations.RemoveField(
            model_name='apiendpointbody',
            name='endpoint',
        ),
        migrations.RemoveField(
            model_name='endpoint_parameter',
            name='id_endpoint',
        ),
        migrations.RemoveField(
            model_name='apiheader',
            name='type_id',
        ),
        migrations.RemoveField(
            model_name='apiqueryparam',
            name='type_id',
        ),
        migrations.RemoveField(
            model_name='apiversion',
            name='base_links',
        ),
        migrations.RemoveField(
            model_name='apiversion',
            name='functions',
        ),
        migrations.RemoveField(
            model_name='endpoint_parameter',
            name='type_id',
        ),
        migrations.RemoveField(
            model_name='tarification',
            name='pricingModel',
        ),
        migrations.RemoveField(
            model_name='tarification',
            name='type',
        ),
        migrations.DeleteModel(
            name='Consommateur',
        ),
        migrations.DeleteModel(
            name='Abonnement',
        ),
        migrations.DeleteModel(
            name='APIcategory',
        ),
        migrations.DeleteModel(
            name='Fournisseur',
        ),
        migrations.DeleteModel(
            name='API',
        ),
        migrations.DeleteModel(
            name='APIdocumentation',
        ),
        migrations.DeleteModel(
            name='ResponseExample',
        ),
        migrations.DeleteModel(
            name='ApiEndpointBody',
        ),
        migrations.DeleteModel(
            name='APIendpoint',
        ),
        migrations.DeleteModel(
            name='ApiHeader',
        ),
        migrations.DeleteModel(
            name='ApiQueryParam',
        ),
        migrations.DeleteModel(
            name='BaseLink',
        ),
        migrations.DeleteModel(
            name='APIversion',
        ),
        migrations.DeleteModel(
            name='Functionnality',
        ),
        migrations.DeleteModel(
            name='Endpoint_parameter',
        ),
        migrations.DeleteModel(
            name='TypeParam',
        ),
        migrations.DeleteModel(
            name='PricingModel',
        ),
        migrations.DeleteModel(
            name='Tarification',
        ),
        migrations.DeleteModel(
            name='TypeTarif',
        ),
    ]
