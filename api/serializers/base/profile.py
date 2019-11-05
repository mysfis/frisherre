from rest_framework import serializers
from api.models import Profile

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = ('url','first_name', 'last_name', 'birth_date', 'picture')
