from rest_framework import serializers
from api.models import Outing, Profile, Attendance
from api.serializers.base.profile import ProfileSerializer
from api.serializers.base.outing import OutingSerializer

class DetailedOutingSerializer(serializers.HyperlinkedModelSerializer):
    organizer = ProfileSerializer(required=True)

    class Meta:
        model = Outing
        fields = (
                'url',
                'title', 'date', 'description',
                'organizer',
                'created_at', 'updated_at')

class AttendanceSerializer(serializers.HyperlinkedModelSerializer):
    outing = OutingSerializer(many=False)
    profile = ProfileSerializer(many=False)
    class Meta:
        model = Attendance
        fields = (
                'url', 
                'outing', 'profile',
                'accepted_at', 'is_participant', 'is_driver', 'attendance_notes')
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        profile = Profile.objects.get(**profile_data)

        outing_data = validated_data.pop('outing')
        outing = Outing.objects.get(**outing_data)

        return Attendance.objects.create(profile=profile, outing=outing, **validated_data)