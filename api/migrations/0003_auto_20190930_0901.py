# Generated by Django 2.2.5 on 2019-09-30 09:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_profile'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserAccount',
            new_name='Account',
        ),
    ]