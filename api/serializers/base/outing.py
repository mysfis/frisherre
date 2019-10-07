from rest_framework import serializers
from api.models import Outing

class OutingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Outing
        fields = (
                'url',
                'title', 'date', 'description',
                'created_at', 'updated_at')
