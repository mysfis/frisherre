from rest_framework import serializers
from api.models import Account, Profile
from api.serializers.base.user import AccountSerializer


class DetailedProfileSerializer(serializers.HyperlinkedModelSerializer):
    account = AccountSerializer(required=True)
    class Meta:
        model = Profile
        fields = ('url','first_name', 'last_name', 'birth_date', 
                'is_main', 'picture', 'account', 'icon_name', 'icon_color')

    def create(self, validated_data):
        account_data = validated_data.pop('account')
        account = Account.objects.get(**account_data)
        return Profile.objects.create(account=account, **validated_data)

    def update(self, instance, validated_data):
        if 'account' in validated_data:
            account_data = validated_data.pop('account')
            serializer = AccountSerializer(instance.account, data=account_data, partial=True)
            serializer.is_valid()
            if serializer.errors: print(serializer.errors)
            else: account = serializer.save()

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.save()

        return instance
