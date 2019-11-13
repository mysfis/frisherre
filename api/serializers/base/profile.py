"""This is module for serializing the Profile Objects

This module does stuff.
"""

from rest_framework import serializers
from api.models import Profile

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    """Serialize a profile with its basie attributes

    Parameters:
    none (int): Description of arg1

    Returns:
    int:Returning value
    """

    class Meta:
        model = Profile
        fields = ('url','first_name', 'last_name', 'birth_date', 'is_main', 'picture')
