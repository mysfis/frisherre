from rest_framework import serializers
from apps.communities.models import Community

class CommunitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Community
        fields = (
                'url',
                'name', 'location',
                'description', 'typology',
                'icon_category', 'icon_name')