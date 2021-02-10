from django.urls import path, include
from dj_rest_auth.views import PasswordResetConfirmView

urlpatterns = [

    path('', include('dj_rest_auth.urls')),
    path('password/reset/confirm/<slug:uidb64>/<slug:token>/',
        PasswordResetConfirmView.as_view(), name='password_reset_confirm'
    ),
]