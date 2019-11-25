# Generated by Django 2.2.6 on 2019-11-05 11:27

import api.models.profile
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20191105_0946'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='image',
        ),
        migrations.AddField(
            model_name='profile',
            name='picture',
            field=models.ImageField(blank=True, upload_to=api.models.profile.scramble_uploaded_filename, verbose_name='Uploaded picture'),
        ),
    ]