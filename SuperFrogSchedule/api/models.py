from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateTimeField()

