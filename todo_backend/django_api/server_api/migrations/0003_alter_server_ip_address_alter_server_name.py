# Generated by Django 4.2.7 on 2023-12-21 02:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server_api', '0002_dummy_servers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='server',
            name='ip_address',
            field=models.GenericIPAddressField(unique=True),
        ),
        migrations.AlterField(
            model_name='server',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
