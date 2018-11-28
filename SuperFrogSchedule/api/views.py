from django.shortcuts import render
from rest_framework import generics
from .models import Superfrog, Admin, Customer, Event, Appearance, OrgType, TeamType
from .serializers import SuperfrogSerializer, AdminSerializer, CustomerSerializer, EventSerializer, AppearanceSerializer, OrgSerializer, TeamSerializer
from rest_framework.permissions import IsAdminUser

class SuperfrogListAPIView(generics.ListCreateAPIView):
    queryset = Superfrog.objects.all()
    serializer_class = SuperfrogSerializer

class AdminListAPIView(generics.ListCreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class CustomerListAPIView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class EventListAPIView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class ApperanceListAPIView(generics.ListCreateAPIView):
    queryset = Appearance.objects.all()
    serializer_class = AppearanceSerializer

class OrgListAPIView(generics.ListCreateAPIView):
    queryset = OrgType.objects.all()
    serializer_class = OrgSerializer

class TeamListAPIView(generics.ListCreateAPIView):
    queryset = TeamType.objects.all()
    serializer_class = TeamSerializer