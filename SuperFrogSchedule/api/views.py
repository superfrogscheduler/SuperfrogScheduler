from django.shortcuts import render
from .models import Superfrog, Admin, Customer, Event, Appearance, SuperfrogAppearance, User,SuperfrogClass
from .serializers import SuperfrogSerializer, AdminSerializer, CustomerSerializer, EventSerializer, AppearanceSerializer,AppearanceShortSerializer, UserSerializer, CustomerAppearanceSerializer, SuperfrogAppearanceSerializer, SuperfrogLandingSerializer,PayrollSerializer, SuperfrogClassSerializer
from rest_framework import viewsets, views, generics, status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action, list_route
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from datetimerange import DateTimeRange
from collections import defaultdict, OrderedDict
from django.contrib.auth import authenticate, login,logout, user_logged_in
from django.contrib.auth.views import PasswordResetView
from rest_framework import permissions
import pdfrw
import os
from django.template.loader import render_to_string, get_template
import datetime
from time import strftime
import json
from .payroll import *
from wsgiref.util import FileWrapper
from django.http import FileResponse, Http404
from io import BytesIO

from django.views.generic.base import TemplateView

from .tasks import *

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

INVOICE_TEMPLATE_PATH = 'Honorarium_Request_Final.pdf'
#INVOICE_OUTPUT_PATH = 'fillform.pdf'

ANNOT_KEY = '/Annots'
ANNOT_FIELD_KEY = '/T'
ANNOT_VAL_KEY='/V'
ANNOT_RECT_KEY = '/Rect'
SUBTYPE_KEY = '/Subtype'
WIDGET_SUBTYPE_kEY='/Widget'

def write_fillable_pdf(input_pdf_path,output_pdf_path,data_dict):
    template_pdf=pdfrw.PdfReader(input_pdf_path)
    annotations=template_pdf.pages[0][ANNOT_KEY]
    for annotation in annotations:
        if annotation[SUBTYPE_KEY]==WIDGET_SUBTYPE_kEY:
            if(annotation[ANNOT_FIELD_KEY]):
                key=annotation[ANNOT_FIELD_KEY][1:-1]
                if key in data_dict.keys():
                    annotation.update(
                        pdfrw.PdfDict(V='{}'.format(data_dict[key]))
                    )

    pdfrw.PdfWriter().write(output_pdf_path,template_pdf)

def payroll_test(request):
    array = json.loads(request.body)
    ids = []
    for i in array:
        ids.append(i['id'])
    data = get_appearance_dict(ids)

    return HttpResponse(200)


@csrf_exempt 
def generatePayroll(request, adminID = None):
    if request.method == 'PATCH':
        Superfrogs = Superfrog.objects.all()
        admin_id = Admin.objects.get(pk = adminID)

        array = json.loads(request.body)
        ids = []
        for i in array:
            ids.append(i['id'])
        data = get_appearance_dict(ids)
        master_pdf = pdfrw.PdfWriter()

        for superfrog in data:
            pdf = create_pdf(superfrog)
            summary = ""
            total = 0
            for appearance in data[superfrog]:
                temp = process_appearance(appearance)
                summary = summary + temp[0] + "\n"
                total = total + temp[1]
            locale.setlocale( locale.LC_ALL, '' )
            data_dict = {
                'appearances' : summary,
                'amount' : locale.currency( total, grouping=True ),
            }
            fill_fields(pdf, data_dict)
            master_pdf.addpages(pdf.pages)
        outpath = datetime.datetime.now().strftime('%d-%m-%y_%H_%M_%S')+ ".pdf"
        master_pdf.write(outpath)  
        with open(outpath, 'rb') as pdf:
            response = HttpResponse(pdf.read(),content_type='application/pdf')
            # response['Content-Disposition'] = 'filename=some_file.pdf'
            return response
        return HttpResponse(FileWrapper(response) , status= 200)


def filter_by_Superfrog_and_date(request,  start_date = None, end_date = None):
    if request.method == 'GET':
        queryset = SuperfrogAppearance.objects.filter( appearance__date__range=[start_date,end_date], appearance__status='Past')
        serializer = PayrollSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()
# def pdf_view(request):
#     with open('/path/to/my/file.pdf', 'r') as pdf:
#         response = HttpResponse(pdf.read(), mimetype='application/pdf')
#         response['Content-Disposition'] = 'inline;filename=some_file.pdf'
#         return response
#     pdf.closed

# def home(request):
# image_data = open(“/path/to/my/image.pdf”, “rb”).read()
# return HttpResponse(image_data, mimetype=”application/pdf”)

def list_by_status(request, status=None):
    if request.method == 'GET':
        queryset = Appearance.objects.filter(status=status)
        serializer = AppearanceShortSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()
def list_by_status_superfrog(request, status=None, sId= None):
    if request.method == 'GET':
        queryset = SuperfrogAppearance.objects.filter(superfrog = sId , appearance__status = status)
        serializer = SuperfrogLandingSerializer(queryset, many = True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()

def list_SuperfrogAppearance_by_Status(request, status=None):
    if request.method == 'GET':
        queryset = SuperfrogAppearance.objects.filter(appearance__status=status)
        serializer = SuperfrogAppearanceSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()

def Appearance_to_Change(request, AID):
    if request.method == 'GET':
        queryset = SuperfrogAppearance.objects.get(pk=AID )
        serializer = SuperfrogAppearanceSerializer(queryset, many=False)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()
#def addEmployee(request):
#    if request.method == 'POST:
#        user = User.objects.create_user('') 

def getSuperfrog(request, id = None):
    if request.method == 'GET':
        queryset = Superfrog.objects.get(user = id)
        serializer = SuperfrogSerializer(queryset, many= False)
        return HttpResponse(JSONRenderer().render(serializer.data))

def getAdmin(request, id = None):
    if request.method == 'GET':
        queryset = Admin.objects.get(user = id)
        serializer = AdminSerializer(queryset, many= False)
        return HttpResponse(JSONRenderer().render(serializer.data))
@csrf_exempt
def appearances(request):
    if request.method == 'GET':
        queryset = Appearance.objects.all()
        serializer = AppearanceShortSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    #save information from form into appearance request
    elif request.method=='POST':
        data = json.loads(request.body)
        appearance_serializer = AppearanceSerializer(data=data['appearance'])
        if appearance_serializer.is_valid():
            appearance = appearance_serializer.save()
            appearance_serializer = AppearanceSerializer(appearance)
            
            
        else:
            return HttpResponse(appearance_serializer.errors, status = 400)
                
        customer_serializer = CustomerSerializer(data=data['customer'])
        #after adding customer to db, send confirmation email to customer confirming contact information and event information.
        if customer_serializer.is_valid():
            customer = customer_serializer.save()
            customer.save()
            appearance.customer = customer
            appearance.save()
            html_message = render_to_string(
                'customer_confirmation.html',
                {
                    'name': appearance.name,
                    'date': appearance.date,
                    'start_time': appearance.start_time,
                    'end_time':appearance.end_time,
                    'first_name': customer.first_name,
                    'last_name':  customer.last_name,
                    'phone': customer.phone,
                    'email': customer.email,
                    'organization': appearance.organization,
                    'location': appearance.location,
                    'description': appearance.description,
                    'status': appearance.status,
                    'special_instructions': appearance.special_instructions,
                    'expenses_and_benefits': appearance.expenses_and_benefits,
                    'cheerleaders': appearance.cheerleaders,
                    'showgirls': appearance.showgirls, 
                    'parking_info': appearance.parking_info,
                    'outside_orgs': appearance.outside_orgs,
                    'performance_required': appearance.performance_required,
                }
            )
            send_mail('Event request confirmation',
            'Thanks for requesting a Superfrog appearance! Here is a confirmation message for the event request: \n' +
             '\n' + 'Customer Contact Information \n' + 
             'Customer Name: ' + customer.first_name + 
             ' ' + customer.last_name + '\n' + 
             'Phone Number: ' + str(customer.phone) + 
             '\n' + 'Customer email: ' + customer.email + 
             '\n' + ' \n' + 'Appearance Information \n' + 
             'Start Time: ' + appearance.name + '\n' +
             'Date: ' + str(appearance.date) + '\n' +
             'Start Time: ' + str(appearance.start_time) + '\n' +
             'End Time: ' + str(appearance.end_time) + '\n' +
             'Organization requesting event: ' + appearance.organization + '\n' + 
             'Location: ' + appearance.location + '\n' + 
             'Description: ' + appearance.description + '\n' + 
             'Status: ' + appearance.status + '\n' +
             'Special Instructions: ' + appearance.special_instructions +  '\n' + 
             'Expenses and Benefits: ' + appearance.expenses_and_benefits + '\n' +
             'Cheerleaders: ' + appearance.cheerleaders + ' Showgirls: ' + appearance.showgirls + '\n' + '\n' +
             'Our team will review your request within the next two weeks. You will receive an email updating you on our decision when it is made. Thanks and Go Frogs!' ,
             'superfrog@scheduler.com',
             [customer.email],
             fail_silently = False,
             html_message = html_message)
        else:
            return HttpResponse(appearance_serializer.errors, status = 400)
        appearance_serializer = AppearanceSerializer(appearance)
        return HttpResponse(status = 200)
    else:
        return HttpResponseBadRequest()

def detail(request, id=None):
    if request.method == 'GET':
        queryset = Appearance.objects.get(pk=id)
        serializer = CustomerAppearanceSerializer(queryset, many=False)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()
def payroll_appearance(request,status=None):
    if request.method == 'GET': 
        queryset = SuperfrogAppearance.objects.filter( appearance__status=status)
        serializer = PayrollSerializer(queryset, many = True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()
def show_appearances_by_superfrog(request, status = None, SFID = None):
    if request.method == 'GET':
        queryset = SuperfrogAppearance.objects.filter(superfrog = SFID, appearance__status = status)
        serializer = SuperfrogAppearanceSerializer(queryset, many = True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else: 
        return HttpResponseBadRequest()

def payroll_detail(request, id=None):
    if request.method == 'GET':
        queryset = SuperfrogAppearance.objects.get(pk=id)
        serializer = PayrollSerializer(queryset, many=False)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()

def superfrog_appearance_detail(request, id=None):
    if request.method == 'GET':
        queryset = SuperfrogAppearance.objects.get(pk=id)
        serializer = SuperfrogAppearanceSerializer(queryset, many=False)
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
        return HttpResponse(reason = serializer.errors, status = 400)
    else:
        return HttpResponseBadRequest()
@csrf_exempt
def update_appearance(request):
    if request.method=='PATCH':
        data = json.loads(request.body)
        appearance_serializer = AppearanceShortSerializer(data=data['appearance'])
        if appearance_serializer.is_valid():
            appearance_serializer.save()
        return HttpResponse(status= 200)
    else:
        return HttpResponse(appearance_serializer.errors, status = 400)

def get_Superfrogs(request):
    if request.method=='GET':
        queryset = Superfrog.objects.all()
        serializer = SuperfrogSerializer(queryset, many = True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()
@csrf_exempt
def signUp(request, id=None, sId = None):
    if request.method=='PATCH':
        appearance_id = Appearance.objects.get(pk=id)
        superfrog_id = Superfrog.objects.get(user_id = sId)
        superfrog_appearance = SuperfrogAppearance(superfrog=superfrog_id, appearance=appearance_id)
        superfrog_appearance.save()
        appearance_id.status = "Assigned"
        appearance_id.save()
        #superfrog email confirming sign up
        superfrog_message = render_to_string(
                'superfrog_confirmation.html',
                {
                    'name': appearance_id.name,
                    'date': appearance_id.date,
                    'start_time': appearance_id.start_time,
                    'end_time':appearance_id.end_time,
                    'first_name': appearance_id.customer.first_name,
                    'last_name':  appearance_id.customer.last_name,
                    'phone': appearance_id.customer.phone,
                    'email': appearance_id.customer.email,
                    'organization': appearance_id.organization,
                    'location': appearance_id.location,
                    'description': appearance_id.description,
                    'status': appearance_id.status,
                    'special_instructions': appearance_id.special_instructions,
                    'expenses_and_benefits': appearance_id.expenses_and_benefits,
                    'cheerleaders': appearance_id.cheerleaders,
                    'showgirls': appearance_id.showgirls, 
                    'parking_info': appearance_id.parking_info,
                    'outside_orgs': appearance_id.outside_orgs,
                    'performance_required': appearance_id.performance_required,
                }
            )
        #customer email confirming appearance
        customer_message = render_to_string(
                'appearance_confirmation.html',
                {
                    'name': appearance_id.name,
                    'date': appearance_id.date,
                    'start_time': appearance_id.start_time,
                    'end_time':appearance_id.end_time,
                    'first_name': appearance_id.customer.first_name,
                    'last_name':  appearance_id.customer.last_name,
                    'phone': appearance_id.customer.phone,
                    'email': appearance_id.customer.email,
                    'organization': appearance_id.organization,
                    'location': appearance_id.location,
                    'description': appearance_id.description,
                    'status': appearance_id.status,
                    'special_instructions': appearance_id.special_instructions,
                    'expenses_and_benefits': appearance_id.expenses_and_benefits,
                    'cheerleaders': appearance_id.cheerleaders,
                    'showgirls': appearance_id.showgirls, 
                    'parking_info': appearance_id.parking_info,
                    'outside_orgs': appearance_id.outside_orgs,
                    'performance_required': appearance_id.performance_required,
                    'cost': str(appearance_id.cost),
                }
            )
        #admin email
        send_mail('Appearance Confirmation','You are scheduled to appear at an event! Here is the appearance info: \n' + 
         '\n' + 'Customer Contact Information \n' 
        + 'Customer Name: ' 
        + appearance_id.customer.first_name 
        + ' ' + appearance_id.customer.last_name 
        + '\n' + 'Phone Number: ' 
        + str(appearance_id.customer.phone) 
        + '\n' + 'Customer email: ' 
        + appearance_id.customer.email 
        + '\n' + ' \n' + 'Appearance Information \n' 
        + 'Name: ' + appearance_id.name + '\n' 
        + 'Start Time: ' + str(appearance_id.start_time) + '\n' 
        + 'End Time: ' + str(appearance_id.end_time) + '\n' 
        + 'Date: ' + str(appearance_id.date) + '\n'
        + 'Organization requesting event: ' + appearance_id.organization 
        + '\n' + 'Location: ' + appearance_id.location 
        + '\n' + 'Description: ' + appearance_id.description 
        + '\n' + 'Status: ' + appearance_id.status + '\n' + '\n' + 'Thanks and Go Frogs!' 
        ,'superfrog@scheduler.com',
        [User.objects.get(pk=sId).email],
        fail_silently = False,
        html_message = superfrog_message)
        #
        send_mail('Superfrog Appearance Confirmation',
        'Your event has been accepted- and Superfrog will be there! Here is the appearance info confirmation: \n' +
        '\n' + 'Customer Contact Information \n' +
        'Customer Name: ' + appearance_id.customer.first_name +
        ' ' + appearance_id.customer.last_name + '\n' +
        'Phone Number: ' + str(appearance_id.customer.phone) +
        '\n' + 'Customer email: ' + appearance_id.customer.email +
        '\n' + ' \n' + 'Appearance Information \n' +
        'Name: ' + appearance_id.name + '\n' 
        + 'Date: ' + str(appearance_id.date) + '\n'
        + 'Start Time: ' + str(appearance_id.start_time) + '\n' 
        + 'End Time: ' + str(appearance_id.end_time) + '\n' 
        'Organization requesting event: ' + appearance_id.organization +
        '\n' + 'Location: ' + appearance_id.location + '\n' +
        'Description: ' + appearance_id.description + '\n' + 'Status: ' +
        appearance_id.status + '\n' + '\n' + 
        'Cost: $' + str(appearance_id.cost) + '\n' +
        'In order to complete the booking of this appearance, you must pay through this link: https://secure.touchnet.com/C21491_ustores/web/classic/product_detail.jsp?PRODUCTID=221' + '\n' +
        'Enter the cost of the appearance ($' + str(appearance_id.cost)+') in the field titled \'Donation Amount\'.\n Thanks and Go Frogs!' ,
        'superfrog@scheduler.com',
        [appearance_id.customer.email],
        fail_silently = False,
        html_message = customer_message)
        return HttpResponse(superfrog_appearance, status= 201)

@csrf_exempt
def acceptAppearance(request, id=None):
    if request.method=='PATCH':
        appearance_id = Appearance.objects.get(pk=id)
        appearance_id.status = "Accepted"
        appearance_id.save()
        #superfrog email notification
        superfrog = User.objects.all()
        slist = []
        for s in superfrog:
            slist.append(s.email)
        
        superfrog_notification = render_to_string(
                'superfrog_notification.html',
                {
                    'name': appearance_id.name,
                    'date': appearance_id.date,
                    'start_time': appearance_id.start_time,
                    'end_time':appearance_id.end_time,
                    'first_name': appearance_id.customer.first_name,
                    'last_name':  appearance_id.customer.last_name,
                    'phone': appearance_id.customer.phone,
                    'email': appearance_id.customer.email,
                    'organization': appearance_id.organization,
                    'location': appearance_id.location,
                    'description': appearance_id.description,
                    'status': appearance_id.status,
                    'special_instructions': appearance_id.special_instructions,
                    'expenses_and_benefits': appearance_id.expenses_and_benefits,
                    'cheerleaders': appearance_id.cheerleaders,
                    'showgirls': appearance_id.showgirls, 
                    'parking_info': appearance_id.parking_info,
                    'outside_orgs': appearance_id.outside_orgs,
                    'performance_required': appearance_id.performance_required,
                }
            )

        send_mail('Superfrog Available Appearance Notification',
        'A new event request has been approved by the admin- we need you to sign up! Below is the appearance info confirmation: \n' +
        '\n' + 'Customer Contact Information \n' +
        'Customer Name: ' + appearance_id.customer.first_name +
        ' ' + appearance_id.customer.last_name + '\n' +
        'Phone Number: ' + str(appearance_id.customer.phone) +
        '\n' + 'Customer email: ' + appearance_id.customer.email +
        '\n' + ' \n' + 'Appearance Information \n' +
        'Name: ' + appearance_id.name + '\n' +
        'Date: ' + str(appearance_id.date) + '\n' +
        'Start Time: ' + str(appearance_id.start_time) + '\n' +
        'End Time: ' + str(appearance_id.end_time) + '\n' +
        'Organization requesting event: ' + appearance_id.organization +
        '\n' + 'Location: ' + appearance_id.location + '\n' +
        'Description: ' + appearance_id.description + '\n' + 'Status: ' +
        appearance_id.status + '\n' + '\n' + 'Thanks and Go Frogs!' ,
        'superfrog@scheduler.com',
        slist,
        fail_silently = False,
        html_message = superfrog_notification)
        
        return HttpResponse( status=201)

@csrf_exempt
def rejectAppearance(request, id = None):
    if request.method=='PATCH':
        appearance_id = Appearance.objects.get(pk=id)
        reason = request.body.decode('utf-8')
        #customer email

        customer_reject = render_to_string(
            'customer_reject.html',
            {
                'reason': reason
            }
        )

        send_mail('Event Request Rejected',
        'We thank you for your event request but Superfrog will not be able to attend due to the reason below:'
        + reason,
        'superfrog@scheduler.com',
        [appearance_id.customer.email],
        fail_silently = False,
        html_message = customer_reject)

        appearance_id.delete()
        
        return HttpResponse(status = 201)

def events(request):
    if request.method == 'GET':
        queryset = Event.objects.all()
        serializer = EventSerializer(queryset, many=True)
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

def class_schedule_intersection(request):
    classes = {}
    frogs = Superfrog.objects.values_list('pk', flat=True)
    for i in range(7):
        classes[i] = []
        # Merge adjacent classes into encompassing classes
        for j in range(len(frogs)):
            classes[i].append([])
            classlist = list(SuperfrogClass.objects.filter(superfrog = frogs[j], day = i).order_by('start', 'end').values('start', 'end'))
            for clss in classlist:
                dtr = toDateRange(datetime.date(2018,12,30), clss['start'], clss['end'])
                if not classes[i][j]:
                    classes[i][j].append(dtr)
                else:
                    inserted = False
                    for k in range(len(classes[i][j])):
                        c = classes[i][j][k]
                        if c.is_intersection(dtr):
                            classes[i][j][k] = c.encompass(dtr)
                            inserted = True
                            break
                    if not inserted:
                        classes[i][j].append(dtr)
        #Convert class time ranges to binary
        for j in range(len(frogs)):
            if(classes[i][j]):
                temp = ""
                interval = DateTimeRange("2018-12-30T08:00:00", "2018-12-30T08:30:00")
                index = 0
                inInterval = False
                while interval.start_datetime.time() < datetime.time(21,30):
                    if index < len(classes[i][j]):
                        if interval in classes[i][j][index]:
                            inInterval = True
                            temp = temp +"1"
                        else:
                            if inInterval:
                                index += 1
                                inInterval = False
                            temp = temp +"0"
                    else:
                        temp = temp + "0"
                    interval = interval+datetime.timedelta(seconds = 30*60)
            else:
                temp = "000000000000000000000000000"
            classes[i][j] = temp
        #And the binary strings together to get intersection
        temp = int("111111111111111111111111111",2)
        for j in range(len(frogs)):
            temp = temp & int(classes[i][j],2)
        classes[i] = format(temp, "027b")

        #Convert the resulting string back into time ranges
        schedule = []
        string = classes[i]
        interval = DateTimeRange("2018-12-30T08:00:00", "2018-12-30T08:30:00")
        flag = False
        if string != "000000000000000000000000000":
            for j in range(len(string)):
                if(string[j]=="1"):
                    if not flag:
                        start = interval.start_datetime
                        start = start.time()
                        flag = True
                else:
                    if flag:
                        schedule.append((start, interval.start_datetime.time()))
                        flag = False
                interval = interval+datetime.timedelta(seconds = 30*60)
        classes[i] = schedule
    #Prepare JSON payload
    response = {}
    for day in classes:
        if classes[day]:
            response[day] = []
            for time in classes[day]:
                response[day].append({'start': {'hour':time[0].hour, 'minute': time[0].minute}, 'end': {'hour':time[1].hour, 'minute': time[1].minute}})
    return HttpResponse(JSONRenderer().render(response))


def list_by_status_list(request, status=None, sID=None):
    if request.method == 'GET':
        queryset = SuperfrogAppearance.objects.filter(appearance__status=status, superfrog=sID)
        serializer = SuperfrogAppearanceSerializer(queryset, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponseBadRequest()
        
@csrf_exempt
def email(request):
    subject = 'You have submitted an appearance request'
    message = 'We will review your request for a superfrog appearance and get back to you within the next 2 weeks.'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['allensarahanne@gmail.com',]
    send_mail( subject, message, email_from, recipient_list )
    return redirect('/customer-confirmation')

@csrf_exempt
def class_schedule(request, id = None):
    if request.method == 'GET':
        queryset = SuperfrogClass.objects.filter(superfrog=id)
        serializer = SuperfrogClassSerializer(queryset, many = True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    elif request.method == 'PATCH':
        data = json.loads(request.body)
        addSerializer = SuperfrogClassSerializer(data = data['toAdd'], many = True)
        if addSerializer.is_valid():
            for u in data['toUpdate']:
                update = SuperfrogClass.objects.get(pk = u['id'])
                updateSerializer = SuperfrogClassSerializer(update, data=u)
                if not updateSerializer.is_valid():
                    return HttpResponseBadRequest(reason = updateSerializer.errors)
                else:
                    updateSerializer.save()
        

            
            for i in range(len(data['toDelete'])):
                sfClass = SuperfrogClass.objects.filter(pk = data['toDelete'][i])
                if sfClass:
                    sfClass.delete()
                else:
                    return HttpResponseBadRequest(reason="Delete Error: class with id " + data.toDelete[i] + " not found")
               
            adds = addSerializer.save()
                
            for add in adds:
                add.save()
               
            queryset = SuperfrogClass.objects.filter(superfrog = id)
            serializer = SuperfrogClassSerializer(queryset, many = True)
            return HttpResponse(JSONRenderer().render(serializer.data))

        else:
            return HttpResponseBadRequest(reason=addSerializer.errors, status = 400) 
    else:
        return HttpResponseBadRequest()


def run_tasks(request):
    dayscan(repeat=86400)
    return HttpResponse(status=200)
#Login View
class login_view(views.APIView):
    #override post function
    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)

        #authenticate user
        user = authenticate(email=email, password=password)

        #authenticate() looks for an user in database using email and then verify if the password matches
        if user is not None:
            if user.is_active:
                #login() create a new session for this user
                login(request, user)
                serializer = UserSerializer(user, context={'request': request})
                #return the user information using the serializer in form of a JSON object
                return Response(serializer.data,status=status.HTTP_200_OK)
            else: #inactive user account
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This user has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else: #no matched user 
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class logout_view(views.APIView):
    #permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
