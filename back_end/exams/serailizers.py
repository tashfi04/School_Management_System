from rest_framework import serializers
from .models import ExamType

class ExamTypeDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model = ExamType
        fields = ['exam_type']
