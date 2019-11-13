from rest_framework import serializers
from api.models import Account, User

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ('url', 'household_name',
                'address_line1', 'address_line2',
                'country', 'city', 'zip')

class MyUserInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'first_name', 'last_name')
