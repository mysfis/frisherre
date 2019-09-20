from rest_framework import serializers
from api.models import Outing

class OutingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outing
        fields = ('id', 'title', 'date', 'description')
