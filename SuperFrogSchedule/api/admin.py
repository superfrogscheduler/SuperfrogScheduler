from django.contrib import admin
from .models import User,Superfrog, Customer, Event, Admin, Appearance, SuperfrogAppearance,SuperfrogClass  
# Register your models here.
admin.site.register(Superfrog)
admin.site.register(Customer)
admin.site.register(Admin)
admin.site.register(Appearance)
admin.site.register(Event)
admin.site.register(SuperfrogAppearance)
admin.site.register(User)
admin.site.register(SuperfrogClass)