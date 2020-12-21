from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from django.conf import settings
from django.conf.urls.static import static

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     
#     path('authentication/', include('authentication.urls')),
#     path('profileStudent/',include('students.urls')),
#     path('profileTeacher/',include('teachers.urls')),
# ]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# #from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [

    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),

    path('token-auth/', obtain_jwt_token),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
