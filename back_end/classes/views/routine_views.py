from ..models import Routine
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from ..serializers import (
    RoutineDetailsSerializer
)

class RoutineDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = RoutineDetailsSerializer

    def get_queryset(self):

        class_id = self.kwargs.get('class_pk', None)

        queryset = Routine.objects.filter(related_class_id=class_id)

        if queryset:
            return queryset
        else:
            raise NotFound("No routine has been added to the class yet!")
