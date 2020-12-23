from django.urls import path, include
from .views import apiOverview

urlpatterns = [

    path('/', apiOverview, name = "api-overview"),

    path('authentication/', include('authentication.urls')),

    path('profileStudent/',include('students.urls')),

    path('profileTeacher/',include('teachers.urls'))
]