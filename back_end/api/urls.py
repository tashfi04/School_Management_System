from django.urls import path, include
from .views import apiOverview

urlpatterns = [

    path('', apiOverview, name="api-overview"),

    #path('accounts/', include('accounts.urls')),

    path('authentication/', include('authentication.urls')),

    path('institution/', include('institution.urls')),

    path('students/', include('students.urls')),

    path('teachers/', include('teachers.urls')),

    path('classes/', include('classes.urls')),

    path('results/', include('results.urls')),

    path('notices/', include('notices.urls')),

    path('exam_types/', include('exams.urls'))
]