# Generated by Django 2.2.5 on 2019-10-01 13:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_account_houselhold_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='houselhold_name',
            new_name='household_name',
        ),
    ]