from rest_framework import serializers
from ..models import MarkSheet, TabulationSheet
from academic_sessions.models import Session
from classes.models import Class, Subject
from exams.models import ExamType

class SessionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'


class SessionBasedClassListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'name', 'group']

class SessionClassBasedSubjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name']

class SessionClassBasedExamTypeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamType
        fields = ['id', 'exam_type']