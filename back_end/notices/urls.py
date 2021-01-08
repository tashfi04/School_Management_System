from django.urls import path
from .views import (
    NoticeList,
    NoticeDetails
)

urlpatterns = [

    path('<str:notice_type>/list/', NoticeList.as_view(), name="notice-list"),
    path('<str:notice_pk>/details/', NoticeDetails.as_view(), name="notice-details")
]