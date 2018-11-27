from django.db import models

class Superfrog(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=200)
    phone = models.IntegerField(default=0)
    id = models.IntegerField(default=0, unique=True, primary_key=True)

class Admin(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.CharField(max_length=200)
    phone = models.IntegerField(default=0)
    id = models.IntegerField(default=0, unique=True, primary_key=True)

class Customer(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.CharField(max_length=200)
    phone = models.IntegerField(default=0)
    id = models.IntegerField(default=0, unique=True, primary_key=True)

class Event(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

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

class TeamType(models.Model):
    team_type = models.CharField(max_length = 255)