from ..models import Institution
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from ..serializers import (
    AboutUsSerializer,
    HeadmasterSpeechSerializer
)

class AboutUsDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = AboutUsSerializer

    def get_queryset(self):

        queryset = Institution.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound("The information hasn't been added yet!")

class HeadmasterSpeechDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = HeadmasterSpeechSerializer

    def get_queryset(self):

        queryset = Institution.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound("The information hasn't been added yet!")

