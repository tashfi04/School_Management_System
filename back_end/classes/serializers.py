from rest_framework import serializers
from .models import Class, Subject

class ClassListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'name', 'group','class_teacher']

class ClassDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

class SubjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['name', 'teacher']