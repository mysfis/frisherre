from rest_framework import serializers
from apps.communities.models import Community, Membership
from apps.profiles.models import Profile
from apps.profiles.serializers import ProfileSerializer


class CommunitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Community
        fields = (
                'url',
                'name', 'location',
                'description', 'typology', 'total_members',
                'icon_category', 'icon_name')

class MembershipSerializer(serializers.HyperlinkedModelSerializer):
    community = CommunitySerializer(required=True)
    profile = ProfileSerializer (required=True)
    class Meta:
        model = Membership
        fields = (
                'url',
                'community', 'profile', 'status')

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        profile = Profile.objects.get(**profile_data)

        community_data = validated_data.pop('community')
        if ('url' in community_data.keys()):
            community = Community.objects.get(**community_data)
        else:
            community = Community.objects.create(created_by=profile, **community_data)

        return Membership.objects.create(
                community=community, 
                profile=profile, 
                **validated_data)