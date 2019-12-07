"""This is module for serializing the Profile Objects

This module does stuff.
"""

from rest_framework import serializers
from apps.users.serializers import AccountSerializer
from apps.profiles.models import Profile, Register
from apps.users.models import Account

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    """Serialize a profile with its basie attributes
    """

    class Meta:
        model = Profile
        fields = ('url', 'first_name', 'last_name', 
                'birth_date', 'is_main', 'icon_name', 'icon_color')

class RegisterSerializer(serializers.HyperlinkedModelSerializer):
    account = AccountSerializer(required=True)
    profile = ProfileSerializer(required=True)
    class Meta:
        model = Register
        fields = ('url','role', 'account', 'profile')
    
    def create(self, validated_data):
        account_data = validated_data.pop('account')
        account = Account.objects.get(**account_data)

        profile_data = validated_data.pop('profile')
        print("profile_data= ", profile_data)
        if ('url' in profile_data.keys()):
            profile = Profile.objects.get(**profile_data)
        else:
            profile = Profile.objects.create(**profile_data)

        return Register.objects.create(account=account, profile=profile, **validated_data)