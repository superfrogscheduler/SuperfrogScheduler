from django.db import models
from datetime import datetime

#To add: customer foreign key on appearance

class Superfrog(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    email = models.CharField(max_length=200)
    phone = models.IntegerField(default=0)
    appearances = models.ManyToManyField("Appearance", through="SuperfrogAppearance")

    def __str__(self):
        return self.first_name + " " + self.last_name

class SuperfrogAppearance(models.Model):
    superfrog = models.ForeignKey(Superfrog, on_delete="NULL")
    appearance = models.ForeignKey("Appearance", on_delete="CASCADE")
    date_assigned = models.DateTimeField(default=datetime.now())

class Admin(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=200)
    phone = models.IntegerField(default=0)

class Customer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=200)
    phone = models.IntegerField(default=0)

class Event(models.Model):
    name = models.CharField(max_length=255, blank=True)
    date = models.DateField(blank = True)
    start_time = models.TimeField(blank = True)
    end_time = models.TimeField(blank = True)
    objects = models.Manager()

    def __str__(self):
        return ""+str(self.pk)+": "+self.name+" "+str(self.date)+" "+str(self.start_time)+"-"+str(self.end_time)


class Appearance(Event):
    #event = models.ForeignKey(Event, on_delete = "CASCADE")
    organization = models.CharField(max_length = 255, blank = True)
    location = models.CharField(max_length=255, blank=True)
    parking_info = models.CharField(max_length=255, blank=True)
    org_type = models.CharField(max_length=255, blank = True)
    team_type = models.CharField(max_length=255, blank = True)
    performance_required = models.BooleanField(default=False)
    location_for_belongings = models.CharField(max_length=255, blank=True)
    expenses_and_benefits = models.CharField(max_length=255, blank=True)
    outside_orgs = models.CharField(max_length = 255, blank = True)
    description = models.CharField(max_length = 1000, blank = True)
    status = models.CharField(max_length = 255, default = "Pending")


    def __str__(self):
        return super().__str__()
class AppearanceStatus(models.Model):
    status = models.CharField(max_length=255)

# class OrgType(models.Model):
#     org_type=models.CharField(max_length = 255)

#     def  __str__(self):
#        return ""+str(self.pk)+": "+self.org_type

# class TeamType(models.Model):
#     team_type = models.CharField(max_length = 255)

#     def  __str__(self):
#        return ""+str(self.pk)+": "+self.team_type
    

