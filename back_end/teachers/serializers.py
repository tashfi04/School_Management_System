from rest_framework import serializers
from .models import Teacher

class TeacherListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['name', 'designation']

class TeacherDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
