from rest_framework import serializers
from ..models import MarkSheet, TabulationSheet

class MarksSerializer(serializers.ModelSerializer):
    exam = serializers.StringRelatedField()
    class Meta:
        model = MarkSheet
        fields = ['exam', 'session', 'student', 'class_test_marks', 'term_test_total_marks', 'total_marks', 'GP', 'letter_grade']

class TabulationSheetSerializer(serializers.ModelSerializer):

    marksheet_set = MarksSerializer(many=True, read_only=True)
    class Meta:
        model = TabulationSheet
        fields = ['marksheet_set', 'total_marks', 'total_GP', 'GPA', 'previous_CGPA', 'current_CGPA', 'letter_grade', 'position']

class ClassTestDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarkSheet
        fields = ['exam', 'session', 'student', 'class_test_marks']

class TermTestDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarkSheet
        fields = ['exam', 'session', 'student', 'term_test_subjective_marks', 'term_test_objective_marks', 'term_test_total_marks']

class LabDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarkSheet
        fields = ['exam', 'session', 'student', 'lab_marks']

class CombinedTestDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarkSheet
        fields = ['exam', 'session', 'student', 'total_marks', 'GP', 'letter_grade']


