from rest_framework import serializers
from .models import Institution

class InstitutionDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['name']

class HomepageDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['description', 'home_background', 'home_photo_1', 'home_photo_2', 'home_photo_3', 'home_photo_4']

class AboutUsDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['overview']

class AcademicDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['academic_overview', 'academic_photo']
