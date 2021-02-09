# import os
# from django.conf import settings
# from django.contrib.staticfiles import finders

from io import StringIO, BytesIO
from xhtml2pdf import pisa
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from html import escape

# def link_callback(uri, rel):
#     """
#     Convert HTML URIs to absolute system paths so xhtml2pdf can access those
#     resources
#     """
#     result = finders.find(uri)
#     if result:
#         if not isinstance(result, (list, tuple)):
#             result = [result]
#         result = list(os.path.realpath(path) for path in result)
#         path=result[0]
#     else:
#         sUrl = settings.STATIC_URL        # Typically /static/
#         sRoot = settings.STATIC_ROOT      # Typically /home/userX/project_static/
#         mUrl = settings.MEDIA_URL         # Typically /media/
#         mRoot = settings.MEDIA_ROOT       # Typically /home/userX/project_static/media/

#         if uri.startswith(mUrl):
#             path = os.path.join(mRoot, uri.replace(mUrl, ""))
#         elif uri.startswith(sUrl):
#             path = os.path.join(sRoot, uri.replace(sUrl, ""))
#         else:
#             return uri

#     # make sure that file exists
#     if not os.path.isfile(path):
#         raise Exception(
#             'media URI must start with %s or %s' % (sUrl, mUrl)
#         )
#     return path

def render_to_pdf(template_src, context_dict):
    template = get_template(template_src)
    html = template.render(context_dict)
    result = BytesIO()

    pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None