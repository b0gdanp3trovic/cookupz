# Generated by Django 3.0.3 on 2020-03-31 17:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('bio', models.TextField(blank=True)),
                ('my_name', models.TextField(blank=True)),
                ('photo_url', models.TextField()),
                ('location', models.TextField(blank=True)),
                ('phone_number', models.TextField(blank=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True, default=None, null=True)),
                ('location', models.TextField(blank=True, default=None, null=True)),
                ('tag', models.TextField(blank=True, default=None, null=True)),
                ('chosen_user', models.OneToOneField(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='chosen_offer', to=settings.AUTH_USER_MODEL)),
                ('int_users', models.ManyToManyField(blank=True, default=None, null=True, related_name='int_offers', to=settings.AUTH_USER_MODEL)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.Profile')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
