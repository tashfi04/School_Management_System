from django.urls import path, include
from .views import apiOverview

urlpatterns = [

     path('profileStudent/',include('students.urls')),

    path('profileTeacher/',include('teachers.urls'))
]  path('', apiOverview, name = "api-overview"),

    path('authentication/', include('authentication.urls')),

 