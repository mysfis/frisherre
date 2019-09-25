from rest_framework import serializers
from api.models import User, UserAccount

class UserAccountSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = UserAccount
        fields = ('url', 'address_line1', 'address_line2',
                'country', 'city', 'zip')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    user_account = UserAccountSerializer(required=True)

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
        UserAccount.objects.create(user=user, **account_data)
        return user

    def update(self, instance, validated_data):
        account_data = validated_data.pop('user_account')
        user_account = instance.user_account

        instance.email = validated_data.get('email', instance.email)
        instance.save()

        user_account.address_line1 = account_data.get(
                'address', user_account.address_line1)
        user_account.address_line2 = account_data.get(
                'address', user_account.address_line2)
        user_account.country = account_data.get(
                'country', user_account.country)
        user_account.city = account_data.get(
                'city', user_account.city)
        user_account.zip = account_data.get(
                'zip', user_account.zip)
        user_account.save()

        return instance
