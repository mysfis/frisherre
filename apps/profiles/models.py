"""A Profile represent a specific person in a household.

the first profile of a household is the account holder, and he can add 
additional profiles for members of his family

"""

# import uuid
from django.db import models
from apps.users.models import Account

# def scramble_uploaded_filename(instance, filename):
#     extension = filename.split(".")[-1]
#     return "{}.{}".format(uuid.uuid4(), extension)

class Profile(models.Model):
    # picture = models.ImageField("Uploaded picture", blank=True, upload_to=scramble_uploaded_filename)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, blank=True)
    birth_date = models.DateField(blank=True, null=True)
    is_main = models.BooleanField(default=False)
    icon_name = models.CharField(max_length=20)
    icon_color = models.CharField(max_length=20)

    accounts = models.ManyToManyField(Account, related_name='profiles',
            through='Register')

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


class Register(models.Model):
    HOLDER, MEMBER, OBSERVER = 1, 2, 3
    ROLE_CHOICES = ((HOLDER, 'Détenteur'), (MEMBER, 'Membre'), (OBSERVER, 'Observateur'))

    account = models.ForeignKey(Account, related_name='register',
            on_delete=models.SET_NULL, null=True)
    profile = models.ForeignKey(Profile, related_name='register',
            on_delete=models.CASCADE, null=True)
    role = models.IntegerField(choices=ROLE_CHOICES, default=MEMBER)

    class Meta:
        unique_together = ('account', 'profile')

    def __str__(self):
        return "{}-{}".format(self.account, self.profile)