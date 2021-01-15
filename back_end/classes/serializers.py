from rest_framework import serializers
from .models import Class, Subject
from students.models import Student
from exams.models import ExamType

class ClassListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'name', 'group','class_teacher']

class ClassDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

class ClassStudentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['name']

class ClassExamTypeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamType
        fields = '__all__'

class SubjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['name', 'teacher']
