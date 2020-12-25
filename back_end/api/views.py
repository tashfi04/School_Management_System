from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])

def apiOverview(request):

    api_urls = {
        'API Overview'      : 'api/v1/',
        'Teacher List'      : 'api/v1/teachers/list/',
        'Teacher Details'   : 'api/v1/teachers/details/',
        'Student Details'   : 'api/v1/students/details/',
        'Classes Details'   : 'api/v1/classes/list/',
    }

    return Response(api_urls)

# Create your views here.
