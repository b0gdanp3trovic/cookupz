# Generated by Django 3.0.3 on 2020-03-27 07:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('bio', models.TextField(blank=True)),
                ('my_name', models.TextField(blank=True)),
                ('photo_url', models.TextField()),
                ('location', models.TextField(blank=True)),
                ('phone_number', models.TextField(blank=True)),
            ],
        ),
    ]
