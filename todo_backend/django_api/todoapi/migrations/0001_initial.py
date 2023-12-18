# Generated by Django 4.2.7 on 2023-11-30 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('temperature', models.FloatField(blank=True, null=True)),
                ('is_done', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'task',
                'ordering': ['created_on'],
            },
        ),
    ]