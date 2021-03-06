# Generated by Django 2.2.5 on 2019-12-06 14:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Community',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('location', models.CharField(max_length=120)),
                ('description', models.TextField()),
                ('typology', models.IntegerField(choices=[(1, 'locale'), (2, 'de pratique'), (3, "d'intérêt"), (4, "d'action"), (5, 'de circomstances')], default=2)),
                ('icon_category', models.CharField(max_length=120)),
                ('icon_name', models.CharField(max_length=120)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name_plural': 'communities',
            },
        ),
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accepted_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.IntegerField(choices=[(1, 'Invité'), (2, 'Membre'), (3, 'Ancien')], default=1)),
                ('community', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='memberships', to='communities.Community')),
            ],
        ),
    ]
