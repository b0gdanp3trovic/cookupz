# Generated by Django 3.0.3 on 2020-03-26 17:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admin', '0003_logentry_add_action_flag_choices'),
        ('dashboard', '0002_auto_20200326_1855'),
        ('users', '0002_auto_20200326_1851'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
