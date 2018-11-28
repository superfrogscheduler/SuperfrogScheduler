from django.contrib import admin
from .models import Superfrog, Customer, Event, Admin, Appearance, OrgType, TeamType
# Register your models here.
admin.site.register(Superfrog)
admin.site.register(Customer)
admin.site.register(Admin)
admin.site.register(Appearance)
admin.site.register(OrgType)
admin.site.register(TeamType)
admin.site.register(Event)