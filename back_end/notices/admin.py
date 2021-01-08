from django.contrib import admin
from .models import Notice

class NoticeAdmin(admin.ModelAdmin):

    list_display = ('title', 'date')

    fields = (('notice_type', 'date'), 'title', 'description', 'attachment')

    readonly_fields = ('date', )

admin.site.register(Notice, NoticeAdmin)
