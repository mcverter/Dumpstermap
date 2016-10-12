from django.contrib import admin

from .models import Dumpster, Voting


class VotingAdmin(admin.ModelAdmin):
    list_display = ('dumpster', 'created_date', 'name', 'value', 'comment')
admin.site.register(Voting, VotingAdmin)


class VotingInline(admin.TabularInline):
    model = Voting

class DumpsterAdmin(admin.ModelAdmin):
    list_display = ('created', 'rating', 'imported_from')
    inlines = [VotingInline,
               ]
admin.site.register(Dumpster, DumpsterAdmin)
