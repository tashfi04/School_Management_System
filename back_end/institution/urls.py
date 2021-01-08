from django.urls import path
from .views import (
    InstitutionDetails,
    HomepageDetails,
    AboutUsDetails,
    HeadmasterSpeechDetails,
    AcademicDetails,
    ContactInfoDetails,
    EventNewsList
)

urlpatterns = [

    path('details/', InstitutionDetails.as_view(), name="institution-details"),
    path('homepage_details/', HomepageDetails.as_view(), name="homepage-details"),
    path('about_us/details/', AboutUsDetails.as_view(), name="about-us-details"),
    path('about_us/headmaster_speech/', HeadmasterSpeechDetails.as_view(), name="headmaster-speech-details"),
    path('academic_details/', AcademicDetails.as_view(), name="academic-details"),
    path('contact_info/', ContactInfoDetails.as_view(), name="contact-info-details"),
    path('event_news_list/', EventNewsList.as_view(), name="event-news-list")
]