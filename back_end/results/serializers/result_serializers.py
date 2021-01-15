from rest_framework import serializers
from ..models import MarkSheet, TabulationSheet

class MarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarkSheet
        fields = ['exam', 'student', 'subject', 'total_marks']

class TabulationSheetSerializer(serializers.ModelSerializer):

    marksheet_set = MarksSerializer(many=True, read_only=True)
    class Meta:
        model = TabulationSheet
        fields = ['total_marks', 'position', 'marksheet_set']

class ResultCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarkSheet
        fields = ['name', 'teacher']
