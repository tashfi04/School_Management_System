from rest_framework import serializers
from .models import Teacher
from classes.models import Subject

class TeacherListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['name', 'designation']

class TeacherDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class TeacherSubjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id','related_class','name']
