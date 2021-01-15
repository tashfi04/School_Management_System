from ..models import EventNews
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from ..serializers import (
    EventListSerializer,
    EventDetailsSerializer
)

class EventList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = EventListSerializer

    def get_queryset(self):

        queryset = EventNews.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound("No event has been published yet!")

class EventDetails(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = EventDetailsSerializer

    def get_queryset(self):
        event_pk = self.kwargs.get('event_pk', None)
        queryset = EventNews.objects.filter(pk = event_pk)

        if queryset:
            return queryset
        else:
            raise NotFound("No such event exists!")
        
        