from rest_framework import serializers
from django.utils import timezone

from apps.users.models import User, Account
from apps.profiles.models import Profile

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'first_name', 'last_name')

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ("url", "name", "accept_news", 
                "address_line1", "address_line2", "zip_code", "city", "country")

class DetailedUserSerializer(serializers.HyperlinkedModelSerializer):
    account = AccountSerializer(required=True)

    class Meta:
        model = User
        fields = ('url', 'email', 'first_name', 'last_name', 'password', 'account')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        account_data = validated_data.pop('account')
        password = validated_data.pop('password')
        
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        
        account = Account.objects.create(user=user, **account_data)

        Profile.objects.create(
            account=account, 
            first_name=user.first_name, 
            last_name=user.last_name, 
            is_main=True)
        
        return user

    def update(self, instance, validated_data):
        if 'account' in validated_data:
            account_data = validated_data.pop('account')
            account = instance.account

            account.name = account_data.get('name', account.name)
            account.accept_news = account_data.get('accept_news', account.accept_news)
            account.address_line1 = account_data.get('address_line1', account.address_line1)
            account.address_line2 = account_data.get('address_line2', account.address_line2)
            account.zip_code = account_data.get('zip_code', account.zip_code)
            account.city = account_data.get('city', account.city)
            account.country = account_data.get('country', useraccount_account.country)
            account.save()

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
