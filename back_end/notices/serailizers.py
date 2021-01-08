from rest_framework import serializers
from .models import Notice

class NoticeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = ['id', 'date', 'title']

class NoticeDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = ['date', 'title', 'description', 'attachment']
        