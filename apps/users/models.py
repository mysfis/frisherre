"""MODEL module for USER object

This module does stuff.
"""

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    username = models.CharField(blank=True, null=True, max_length=254)
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return "{}".format(self.email)

class Account(models.Model):
    name = models.CharField(max_length=255)
    accept_news = models.BooleanField(default=False)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True)
    zip_code = models.CharField(max_length=5)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)

    user = models.OneToOneField(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE,
            related_name='account')

    def __str__(self):
        return "{}".format(self.name)
    # photo = models.ImageField(upload_to='uploads', blank=True)

# @receiver(post_save, sender=User)
# def create_or_update_user_account(sender, instance, created, **kwargs):
#     if created:
#         UserAccount.objects.create(user=instance)
#     instance.user_account.save()
