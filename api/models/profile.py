from django.db import models
from api.models import Account

class Profile(models.Model):
    account = models.ForeignKey(Account, related_name='profiles', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, blank=True)
    birth_date = models.DateField()

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
