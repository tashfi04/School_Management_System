from rest_framework import serializers
from ..models import MarkSheet, TabulationSheet

class MarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarkSheet
        fields = ['exam', 'student', 'class_test_marks', 'term_test_total_marks', 'total_marks', 'GP', 'letter_grade']

class TabulationSheetSerializer(serializers.ModelSerializer):

    marksheet_set = MarksSerializer(many=True, read_only=True)
    class Meta:
        model = TabulationSheet
        fields = ['marksheet_set', 'total_marks', 'total_GP', 'GPA', 'previous_CGPA', 'current_CGPA', 'letter_grade', 'position']

# class ResultCardSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MarkSheet
#         fields = ['name', 'teacher']
