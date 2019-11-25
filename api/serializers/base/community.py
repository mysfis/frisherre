from rest_framework import serializers
from api.models import Community

class CommunitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Community
        fields = (
                'url',
                'name', 'location',
                'description',
                'category', 'icon')
