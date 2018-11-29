from django.shortcuts import render
from rest_framework import viewsets
from .models import Superfrog, Admin, Customer, Event, Appearance, OrgType, TeamType
from .serializers import SuperfrogSerializer, AdminSerializer, CustomerSerializer, EventSerializer, AppearanceSerializer,AppearanceShortSerializer, OrgSerializer, TeamSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

class AppearanceViewSet(viewsets.ViewSet):
    queryset = Appearance.objects.all()
    serializer_class = AppearanceSerializer

    def list(self,request, *args, **kwargs ):
        appearances = Appearance.objects.all()
        serializer = AppearanceShortSerializer(appearances, many=True)
        return Response(serializer.data)

    