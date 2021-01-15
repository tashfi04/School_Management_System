from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])

def apiOverview(request):

    api_urls = {
        'API Overview'                      : 'api/v1/',

        'Basic Information Related API'     : '--------------------------------------------------------------------------',
        'Institution Details'               :'api/v1/institution/details/',
        'Homepage Details'                  :'api/v1/institution/homepage_details/',
        'About Us Details'                  :'api/v1/institution/about_us/details/',
        'Headmaster\'s Speech'              :'api/v1/institution/about_us/headmaster_speech/',
        'Academic Details'                  :'api/v1/institution/academic_details/',
        'Contact Information'               :'api/v1/institution/contact_info/',
        'Event List'                        :'api/v1/institution/events/list/',
        'Event Details'                     :'api/v1/institution/events/<str:event_pk>/details/',

        'Teacher Related API'               : '--------------------------------------------------------------------------',
        'Teacher List'                      : 'api/v1/teachers/list/',
        'Teacher Details'                   : 'api/v1/teachers/details/',
        'Teacher Subject List'              : 'api/v1/teachers/<str:teacher_pk>/subjects/list/',

        'Student Related API'               : '--------------------------------------------------------------------------',
        'Student Details'                   : 'api/v1/students/details/',

        'Class Related API'                 : '--------------------------------------------------------------------------',
        'Class List'                        : 'api/v1/classes/list/',
        'Class Details'                     : 'api/v1/classes/<str:class_pk>/details/',
        'Class Students List'               : 'api/v1/classes/<str:class_pk>/students/list/',
        'Class Exam Type List'              : 'api/v1/classes/<str:class_pk>/exam_types/list/',

        'Subject Related API'               : '--------------------------------------------------------------------------',
        'Subject List'                      : 'api/v1/classes/<str:class_pk>/subjects/list/',
        'Subject Details'                   : 'api/v1/classes/subjects/<str:subject_pk>/details/',

        'Result Related API'                : '--------------------------------------------------------------------------',
        'Marksheet List Create Update'      : 'api/v1/results/marksheet/<str:subject_pk>/<str:exam_pk>/',
        'Tabulationsheet List'              : 'api/v1/results/tabulationsheet/<str:class_pk>/<str:exam_type_pk>/list/',

        'Notice Related API'                : '--------------------------------------------------------------------------',
        'Notice List'                       : 'api/v1/notices/<str:notice_type>/list/',
        'Notice Details'                    : 'api/v1/notices/<str:notice_pk>/details/'
    }

    return Response(api_urls)

# Create your views here.
