# Generated by Django 2.2.5 on 2019-12-11 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0002_auto_20191206_1435'),
    ]

    operations = [
        migrations.AlterField(
            model_name='community',
            name='typology',
            field=models.IntegerField(choices=[(1, 'de voisinage'), (2, 'de pratique'), (3, "d'intérêt"), (4, "d'action"), (5, 'de circomstances')], default=2),
        ),
        migrations.AlterField(
            model_name='membership',
            name='status',
            field=models.IntegerField(choices=[(0, 'Membre'), (1, 'Administrateur'), (2, 'Invité'), (3, 'Ancien')], default=2),
        ),
    ]
