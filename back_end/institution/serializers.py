from rest_framework import serializers
from .models import Institution, EventNews

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['name']

class HomepageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['description', 'home_background', 'home_photo_1', 'home_photo_2', 'home_photo_3', 'home_photo_4']

class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['overview', 'about_us_photo']

class HeadmasterSpeechSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['headmaster_speech', 'headmaster_photo']

class AcademicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['academic_overview', 'academic_photo']

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['phone_no', 'email', 'address']

class EventListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventNews
        fields = ['id', 'date', 'title','description','photo']

class EventDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventNews
        fields = ['date', 'title', 'description', 'photo']
