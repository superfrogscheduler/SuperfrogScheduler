from django.db import models
from datetime import datetime

class Superfrog(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
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
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.CharField(max_length=200)
    phone = models.IntegerField(default=0)

class Customer(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.CharField(max_length=200)
    phone = models.IntegerField(default=0)

class Event(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    objects = models.Manager()

    def __str__(self):
        return ""+str(self.pk)+": "+self.name+" "+str(self.date)+" "+str(self.start_time)+"-"+str(self.end_time)


class Appearance(Event):
    #event = models.ForeignKey(Event, on_delete = "CASCADE")
    organization = models.CharField(max_length = 255)
    location = models.CharField(max_length=255)
    parking_info = models.CharField(max_length=255, blank=True)
    org_type = models.ForeignKey("OrgType", on_delete="NULL")
    team_type = models.ForeignKey("TeamType", on_delete="NULL")
    performance_required = models.BooleanField()
    location_for_belongings = models.CharField(max_length=255, blank=True)
    expenses_and_benefits = models.CharField(max_length=255, blank=True)
    outside_orgs = models.BooleanField()
    description = models.CharField(max_length = 1000)
    status = models.ForeignKey("AppearanceStatus", on_delete="NULL")


    def __str__(self):
        return str(self.event)
class AppearanceStatus(models.Model):
    status = models.CharField(max_length=255)

class OrgType(models.Model):
    org_type=models.CharField(max_length = 255)

    def  __str__(self):
       return ""+str(self.pk)+": "+self.org_type

class TeamType(models.Model):
    team_type = models.CharField(max_length = 255)

    def  __str__(self):
       return ""+str(self.pk)+": "+self.team_type
    

