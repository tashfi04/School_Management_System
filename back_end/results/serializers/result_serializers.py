from rest_framework import serializers
from ..models import MarkSheet, TabulationSheet
from classes.models import Exam

class ExamSerializer(serializers.ModelSerializer):
    related_class = serializers.StringRelatedField()
    subject = serializers.StringRelatedField()
    class Meta:
        model = Exam
        fields = ['related_class', 'subject']

class MarksSerializer(serializers.ModelSerializer):
    exam = ExamSerializer(read_only=True)
    session = serializers.StringRelatedField()
    class Meta:
        model = MarkSheet
        fields = ['exam', 'session', 'student', 'roll_no', 'class_test_marks', 'term_test_total_marks', 'total_marks', 'GP', 'letter_grade']

class TabulationSheetSerializer(serializers.ModelSerializer):

    marksheet_set = MarksSerializer(many=True, read_only=True)
    class Meta:
        model = TabulationSheet
        fields = ['marksheet_set', 'total_marks', 'total_GP', 'GPA', 'previous_CGPA', 'current_CGPA', 'letter_grade', 'position']

class ClassTestDetailsSerializer(serializers.ModelSerializer):
    exam = ExamSerializer(read_only=True)
    session = serializers.StringRelatedField()
    class Meta:
        model = MarkSheet
        fields = ['exam', 'session', 'student', 'roll_no', 'class_test_marks']

class TermTestDetailsSerializer(serializers.ModelSerializer):
    exam = ExamSerializer(read_only=True)
    session = serializers.StringRelatedField()
    class Meta:
        model = MarkSheet
        fields = ['exam', 'session', 'student', 'roll_no', 'term_test_subjective_marks', 'term_test_objective_marks', 'term_test_total_marks']

class LabDetailsSerializer(serializers.ModelSerializer):
    exam = ExamSerializer(read_only=True)
    session = serializers.StringRelatedField()
    class Meta:
        model = MarkSheet
        fields = ['exam', 'session', 'student', 'roll_no', 'lab_marks']

class CombinedTestDetailsSerializer(serializers.ModelSerializer):
    exam = ExamSerializer(read_only=True)
    session = serializers.StringRelatedField()
    class Meta:
        model = MarkSheet
        fields = ['exam', 'session', 'student', 'roll_no', 'total_marks', 'GP', 'letter_grade']

