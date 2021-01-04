from django.urls import path
from .views import (
    InstitutionDetails,
    HomepageDetails,
    AboutUsDetails,
    AcademicDetails
)

urlpatterns = [

    path('details/', InstitutionDetails.as_view(), name = "institution-details"),
    path('homepage_details/', HomepageDetails.as_view(), name = "homepage-details"),
    path('about_us_details/', AboutUsDetails.as_view(), name = "about-us-details"),
    path('academic_details/', AcademicDetails.as_view(), name = "academic-details")
]