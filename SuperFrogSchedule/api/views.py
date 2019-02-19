from django.shortcuts import render
from rest_framework import viewsets, views, generics
from .models import Superfrog, Admin, Customer, Event, Appearance
from .serializers import SuperfrogSerializer, AdminSerializer, CustomerSerializer, EventSerializer, AppearanceSerializer,AppearanceShortSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action, list_route
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from datetimerange import DateTimeRange
from collections import defaultdict, OrderedDict

import json

# class AppearanceViewSet(viewsets.ViewSet):
#     queryset = Appearance.objects.all()
#     serializer_class = AppearanceSerializer

#     def list(self,request, *args, **kwargs ):
#         appearances = Appearance.objects.all()
#         serializer = AppearanceShortSerializer(appearances, many=True)
#         return Response(serializer.data)

#     @list_route(methods=['get'])
#     def list_by_status(self, request, status_id):
#         appearances = queryset.filter(status=status_id)
#         serializer = AppearanceShortSerializer(appearances, many=True)
#         return Response(serializer.data)

#     serializer = AppearanceShortSerializer

def list_by_status(request, status=None):
    if request.method == 'GET':
        queryset = Appearance.objects.filter(status=status)
        serializer = AppearanceShortSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()
@csrf_exempt
def appearances(request):
    if request.method == 'GET':
        queryset = Appearance.objects.all()
        serializer = AppearanceShortSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    elif request.method=='POST':
        data = json.loads(request.body)
        print(data)
        appearance_serializer = AppearanceSerializer(data=data['appearance'])
        if appearance_serializer.is_valid():
            appearance = appearance_serializer.save()
            appearance_serializer = AppearanceSerializer(appearance)
            print(appearance_serializer.data)
            appearance.save()
        else:
            print(appearance_serializer.errors)
            return HttpResponse(appearance_serializer.errors, status = 400)
                
        customer_serializer = CustomerSerializer(data=data['customer'])
        if customer_serializer.is_valid():
            customer = customer_serializer.save()
            customer.save()
        else:
            print(customer_serializer.errors)
            return HttpResponse(appearance_serializer.errors, status = 400)
        appearance_serializer = AppearanceSerializer(appearance)
        return HttpResponse(appearance_serializer.data, status = 201)
    else:
        return HttpResponseBadRequest()

def detail(request, id=None):
    if request.method == 'GET':
        queryset = Appearance.objects.get(pk=id)
        serializer = AppearanceSerializer(queryset, many=False)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()

def create(request):
    if request.method=='POST':
        data = JSONParser().parse(request.body)
        serializer = AppearanceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(serializer.data, status = 201)
        return HttpResponse(serializer.errors, status = 400)
    else:
        return HttpResponseBadRequest()

def events(request):
    if request.method == 'GET':
        queryset = Event.objects.all()
        serializer = EventSerializer(queryset, many=True)
        print(serializer.data)
        print(type(serializer.data))
        return HttpResponse(JSONRenderer().render(serializer.data))    

def toDateRange(date, start, end):
    startstr = str(date)+"T"+str(start)
    endstr = str(date)+"T"+str(end)
    return DateTimeRange(startstr,endstr)

def events_customer_monthly(request, year, month):
    events = defaultdict(list)
    queryset = Event.objects.filter(date__year = year, date__month = month).order_by('date', 'start_time', 'end_time')
    for event in queryset:
        dtr = toDateRange(event.date, event.start_time, event.end_time)
        if not events[event.date]:
            events[event.date].append(dtr)
        else:
            inserted = False
            for i in range(len(events[event.date])):
                e =  events[event.date][i]
                if e.is_intersection(dtr):
                    events[event.date][i] = e.encompass(dtr)
                    inserted = True
                    break
            if not inserted:
                events[event.date].append(dtr)
    response = []
    for day in events:
        for event in events[day]:
            event.start_time_format = '%H:%M:%S'
            event.end_time_format = '%H:%M:%S'
            response.append(OrderedDict([('start', str(day) + " "+ event.get_start_time_str()), ('end',  str(day) + " "+ event.get_end_time_str()), ('editable', False)]))
    return HttpResponse(JSONRenderer().render(response))


