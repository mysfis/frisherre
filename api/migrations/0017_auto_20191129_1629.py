# Generated by Django 2.2.5 on 2019-11-29 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20191129_1629'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='icon_color',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='profile',
            name='icon_name',
            field=models.CharField(max_length=20),
        ),
    ]