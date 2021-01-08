from ..models import EventNews
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from ..serializers import (
    EventNewsSerializer
)

class EventNewsList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = EventNewsSerializer

    def get_queryset(self):

        queryset = EventNews.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound("The event related news hasn't been published yet!")
        