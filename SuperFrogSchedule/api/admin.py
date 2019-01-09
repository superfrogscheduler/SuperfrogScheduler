from django.contrib import admin
from .models import Superfrog, Customer, Event, Admin, Appearance, SuperfrogAppearance, AppearanceStatus  
# Register your models here.
admin.site.register(Superfrog)
admin.site.register(Customer)
admin.site.register(Admin)
admin.site.register(Appearance)
admin.site.register(Event)
admin.site.register(SuperfrogAppearance)
admin.site.register(AppearanceStatus)