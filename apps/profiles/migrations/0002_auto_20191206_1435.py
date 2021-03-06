# Generated by Django 2.2.5 on 2019-12-06 14:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='register',
            name='account',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='register', to='users.Account'),
        ),
        migrations.AddField(
            model_name='register',
            name='profile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='register', to='profiles.Profile'),
        ),
        migrations.AddField(
            model_name='profile',
            name='accounts',
            field=models.ManyToManyField(related_name='profiles', through='profiles.Register', to='users.Account'),
        ),
        migrations.AlterUniqueTogether(
            name='register',
            unique_together={('account', 'profile')},
        ),
    ]
