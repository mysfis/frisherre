from rest_framework import serializers
from api.models import Account

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ('url', 'household_name',
                'address_line1', 'address_line2',
                'country', 'city', 'zip')
