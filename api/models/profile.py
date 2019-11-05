import uuid
from django.db import models
from api.models import Account

def scramble_uploaded_filename(instance, filename):
    extension = filename.split(".")[-1]
    return "{}.{}".format(uuid.uuid4(), extension)

class Profile(models.Model):
    account = models.ForeignKey(Account, related_name='profiles', on_delete=models.CASCADE)
    picture = models.ImageField("Uploaded picture", blank=True, upload_to=scramble_uploaded_filename)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, blank=True)
    birth_date = models.DateField()

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
