from ..models import MarkSheet, TabulationSheet
from rest_framework import permissions

from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView
)

from ..serializers import (
    TabulationSheetSerializer
)

# class TabulationSheetCreate(ListAPIView):

#     permission_classes = [permissions.AllowAny]
#     serializer_class = TabulationSheetSerializer

#     def get_queryset(self):

#         """
#         https://stackoverflow.com/questions/10691359/django-1-4-bulk-create-with-a-list

#         https://stackoverflow.com/questions/57801478/django-bulk-update-from-a-list-of-dicts-without-constructing-the-whole-query-se

#         https://stackoverflow.com/questions/52033242/how-to-sum-elements-in-list-of-dictionaries-if-two-key-values-are-the-same?fbclid=IwAR0b7a6UTXh68XOJoARsfL0Pqsb-mMTkHrG7BckQDzKh9hASc8y5A6d3HI4
#         """

#         exam_id = self.kwargs.get('exam_pk', None)

#         marksheets = MarkSheet.objects.filter(exam_id=exam_id)

#         marksheets_data_frame = read_frame(marksheets, fieldnames=['student', 'total_marks'])

#         marksheets = marksheets_data_frame.groupby(['student',], as_index=False).total_marks.sum().to_dict('records')

#         print("----->>>>>>>")
#         print(marksheets)

#         #return (marksheets)
#         #for marksheet in marksheets:


#         #queryset = TabulationSheet.objects.all()

#         # if queryset:
#         #     return queryset
#         # else:
#         #     raise NotFound("No classes available")

class TabulationSheetList(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = TabulationSheetSerializer

    def get_queryset(self):

        class_id = self.kwargs.get('class_pk', None)
        exam_type_id = self.kwargs.get('exam_type_pk', None)

        queryset = TabulationSheet.objects.filter(marksheet__exam__exam_type_id=exam_type_id, marksheet__exam__related_class_id=class_id).distinct()

        if queryset:
            return queryset
        else:
            raise NotFound("No tabulation sheet has created yet!")

class ResultCardDetails(ListAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = TabulationSheetSerializer

    def get_queryset(self):

        class_id = self.kwargs.get('class_pk', None)
        student_id = self.kwargs.get('student_pk', None)

        queryset = TabulationSheet.objects.filter(marksheet__exam__related_class_id=class_id, marksheet__student_id=student_id).distinct()

        if queryset:
            return queryset
        else:
            raise NotFound("No result card available")
