from rest_framework import serializers
from api.models import User, Account, Profile

class AccountSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Account
        fields = ('url', 'houselhold_name',
                'address_line1', 'address_line2',
                'country', 'city', 'zip')

class UserSerializer(serializers.HyperlinkedModelSerializer):

    user_account = AccountSerializer(required=True)

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

            user_account.houselhold_name = account_data.get(
                    'houselhold_name', user_account.houselhold_name)
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

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    account = AccountSerializer(required=True)
    class Meta:
        model = Profile
        fields = ('url','first_name', 'last_name', 'birth_date', 'account')

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
