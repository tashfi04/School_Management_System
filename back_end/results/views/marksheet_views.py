from ..models import MarkSheet
from institution.models import Institution
from rest_framework import permissions
from rest_framework.response import Response

from rest_framework.exceptions import (
    NotFound,
    APIException,
    NotAcceptable,
    PermissionDenied,
    ValidationError
)
from rest_framework.generics import (
    ListCreateAPIView
)

from ..serializers import (
    MarkSheetSerializer
)

def validate_ids(data, field="id", unique=True):

    if isinstance(data, list):
        id_list = [int(x[field]) for x in data]

        if unique and len(id_list) != len(set(id_list)):
            raise ValidationError("Multiple updates to a single {} found".format(field))

        return id_list

    return [data]


class MarkSheetListCreateUpdate(ListCreateAPIView):

    #permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]
    #serializer_class = MarkSheetCreateSerializer
    serializer_class = MarkSheetSerializer

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True

        return super(MarkSheetListCreateUpdate, self).get_serializer(*args, **kwargs)

    def get_queryset(self, ids=None):
        if ids:
            return MarkSheet.objects.filter(
                #subject_id=self.kwargs["subject_pk"], exam_id=self.kwargs["exam_pk"], id__in=ids,
                exam_id=self.kwargs["exam_pk"], session_id=get_current_session_id(), id__in=ids,
            )

        return MarkSheet.objects.filter(
                #subject_id=self.kwargs["subject_pk"], exam_id=self.kwargs["exam_pk"]
                exam_id=self.kwargs["exam_pk"], session_id=get_current_session_id()
                # subject_id=self.kwargs.get("subject_pk", None), exam_id=self.kwargs.get("exam_pk", None)
            )

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):

        ids = validate_ids(request.data)

        instances = self.get_queryset(ids=ids)

        serializer = self.get_serializer(
            instances, data=request.data, partial=False, many=True
        )

        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


def get_current_session_id():

    institution = Institution.objects.all().first()

    return institution.current_session_id
    