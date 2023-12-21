from django.db import migrations

def create_dummy_servers(apps, schema_editor):
    Task = apps.get_model('server_api', 'Server')

    Task(name='test_server_one.uk', ip_address='123.123.123.123').save()
    Task(name='test_server_two.uk', ip_address='192.168.0.1').save()
    Task(name='test_server_three.uk', ip_address='172.16.0.1').save()


class Migration(migrations.Migration):

    dependencies = [
        ('server_api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_dummy_servers),
    ]