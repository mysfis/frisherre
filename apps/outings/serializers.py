from rest_framework import serializers
from apps.profiles.models import Profile
from apps.outings.models import Outing, Attendance
from apps.profiles.serializers import ProfileSerializer

class OutingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Outing
        fields = (
                'url',
                'title', 'location',
                'date', 'description',
                'created_at', 'updated_at')

class AttendanceSerializer(serializers.HyperlinkedModelSerializer):
    outing = OutingSerializer(many=False)
    profile = ProfileSerializer(many=False)
    class Meta:
        model = Attendance
        fields = (
                'url', 
                'outing', 'profile',
                'accepted_at', 'status', 'role', 'is_driver', 'attendance_notes')
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        profile = Profile.objects.get(**profile_data)

        outing_data = validated_data.pop('outing')
        outing = Outing.objects.get(**outing_data)

        return Attendance.objects.create(profile=profile, outing=outing, **validated_data)

class OutingAttendanceSerializer(serializers.HyperlinkedModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = Attendance
        fields = (
                'url', 'profile',
                'accepted_at', 'status', 'role', 'is_driver', 'attendance_notes')

class ScheduleSerializer(serializers.HyperlinkedModelSerializer):
    attendances = OutingAttendanceSerializer(many=True)
    class Meta:
        model = Outing
        fields = (
                'url',
                'title', 'location',
                'date', 'description',
                'attendances')