# Generated by Django 4.2.7 on 2023-12-20 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Server',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=50)),
                ('ip_address', models.GenericIPAddressField()),
            ],
            options={
                'db_table': 'server',
                'ordering': ['created_on'],
            },
        ),
    ]
