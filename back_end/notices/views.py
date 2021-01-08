from .models import Notice
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from .serailizers import (
    NoticeListSerializer,
    NoticeDetailsSerializer
)

class NoticeList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = NoticeListSerializer

    def get_queryset(self):

        notice_type = self.kwargs.get('notice_type', None)

        queryset = Notice.objects.filter(notice_type=notice_type).order_by('-date')

        if queryset:
            return queryset
        else:
            raise NotFound("No notice hasn't been published yet!")

class NoticeDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = NoticeDetailsSerializer

    def get_queryset(self):

        notice_id = self.kwargs.get('notice_pk', None)

        queryset = Notice.objects.filter(id=notice_id)

        if queryset:
            return queryset
        else:
            raise NotFound("The notice you're looking for doesn't exist!")
        