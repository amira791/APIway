# Generated by Django 4.2.1 on 2024-05-21 23:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_mapi', '0007_alter_comment_created_by'),
    ]

    operations = [
        migrations.CreateModel(
            name='TicketResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('response_text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api_mapi.fournisseur')),
                ('ticket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='api_mapi.ticket')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]