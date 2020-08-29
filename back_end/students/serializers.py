from rest_framework import serializers
from students.models import Student

class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
        'username',
        'name',
        'gender',
        'date_of_birth',
        'place_of_birth',
        'mother_name',
        'father_name',
        'guardian_name',
        'present_address',
        'permanent_address',
        'email',
        'telephone',
        'emergency_telephone',
        'religion',
        'nationality',
        'previous_class',
        'previous_school',
        'current_class',
        'tc_number',
        'date',
        'photo',
        'employed_guardian_name',
        'student_signature',
        'guardian_signature',
        'headmaster_signature'
        ]