from rest_framework import serializers
from django.utils import timezone

from api.models import User, Account, Profile
from api.serializers.base.profile import ProfileSerializer
from api.serializers.base.user import AccountSerializer


class DetailedAccountSerializer(serializers.HyperlinkedModelSerializer):
    profiles = ProfileSerializer(required=True, many=True)

    class Meta:
        model = Account
        fields = ('url', 'household_name',
                'address_line1', 'address_line2',
                'country', 'city', 'zip', 'profiles')

class DetailedUserSerializer(serializers.HyperlinkedModelSerializer):
    user_account = DetailedAccountSerializer(required=True)

    class Meta:
        model = User
        fields = ('url', 'email',
                'first_name', 'last_name', 'password', 'user_account')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        account_data = validated_data.pop('user_account')
        password = validated_data.pop('password')
        
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        
        Account.objects.create(user=user, **account_data)
        
        return user

    def update(self, instance, validated_data):
        if 'user_account' in validated_data:
            account_data = validated_data.pop('user_account')
            user_account = instance.user_account

            user_account.household_name = account_data.get(
                    'household_name', user_account.household_name)
            user_account.address_line1 = account_data.get(
                    'address_line1', user_account.address_line1)
            user_account.address_line2 = account_data.get(
                    'address_line2', user_account.address_line2)
            user_account.country = account_data.get(
                    'country', user_account.country)
            user_account.city = account_data.get(
                    'city', user_account.city)
            user_account.zip = account_data.get(
                    'zip', user_account.zip)
            user_account.save()

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        return instance

    def partial_update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
