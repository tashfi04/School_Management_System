from django.urls import path
from .views import current_user, UserList, test

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('test/', test)
]

#from .views import current_user, UserList, test
