from rest_framework import serializers
from .models import Class, Subject
from students.models import Student

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

class ClassStudentsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['name']


