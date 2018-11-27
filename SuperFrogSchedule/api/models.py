from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return ""+str(self.pk)+": "+self.name+" "+str(self.date)+" "+str(self.start_time)+"-"+str(self.end_time)


class Appearance(models.Model):
    event_id = models.ForeignKey(Event, on_delete = "CASCADE")
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

class OrgType(models.Model):
    org_type=models.CharField(max_length = 255)

    def  __str__(self):
       return ""+str(self.pk)+": "+self.org_type

class TeamType(models.Model):
    team_type = models.CharField(max_length = 255)

    def  __str__(self):
       return ""+str(self.pk)+": "+self.team_type
    

