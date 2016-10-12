from django.contrib import admin

from .models import Dumpster, Voting


class VotingAdmin(admin.ModelAdmin):
    list_display = ('dumpster', 'created_date', 'name', 'value', 'comment')
admin.site.register(Voting, VotingAdmin)


class VotingInline(admin.TabularInline):
    model = Voting

class DumpsterAdmin(admin.ModelAdmin):
    list_display = ('id', 'created', 'rating', 'type', 'imported_from', 'import_reference', 'import_date')
    inlines = [VotingInline,
               ]
    search_fields = ['id', 'import_reference', 'imported_from']

admin.site.register(Dumpster, DumpsterAdmin)
