# Generated by Django 3.0.3 on 2020-04-08 22:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_offer_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('where', models.TextField(blank=True, default=None, null=True)),
                ('position', models.TextField(blank=True, default=None, null=True)),
                ('how_long', models.TextField(blank=True, default=None, null=True)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='interests', to='dashboard.Profile')),
            ],
        ),
    ]