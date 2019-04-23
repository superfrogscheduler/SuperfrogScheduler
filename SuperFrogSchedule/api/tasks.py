from background_task import background
from .models import *
from django.core.mail import send_mail
from django.template.loader import render_to_string, get_template

def set_past():
    past_appearances = Appearance.objects.filter(date__lt=datetime.datetime.now(), status = 'Assigned')
    for appearance in past_appearances:
        appearance.status = 'Past'
        appearance.save()
        #print(appearance.name + ' has been marked as past')
    
def superfrog_remind():
    upcoming_appearances = Appearance.objects.filter(date__lte = datetime.datetime.now() + datetime.timedelta(days=7), status = 'Assigned')
    #print(upcoming_appearances)
    for appearance in upcoming_appearances:
        superfrog_appearances = SuperfrogAppearance.objects.filter(appearance = appearance.pk)
        for sa in superfrog_appearances:
            pass
            superfrog_reminder = render_to_string(
                'superfrog_reminder.html',
                {
                    'name': appearance.appearance.name,
                    'date': appearance.appearance.date,
                    'start_time': appearance.appearance.start_time,
                    'end_time':appearance.appearance.end_time,
                    'first_name': appearance.appearance.customer.first_name,
                    'last_name':  appearance.appearance.customer.last_name,
                    'phone': appearance.appearance.customer.phone,
                    'email': appearance.appearance.customer.email,
                    'organization': appearance.appearance.organization,
                    'location': appearance.appearance.location,
                    'description': appearance.appearance.description,
                    'status': appearance.appearance.status,
                    'special_instructions': appearance.appearance.special_instructions,
                    'expenses_and_benefits': appearance.appearance.expenses_and_benefits,
                    'cheerleaders': appearance.appearance.cheerleaders,
                    'showgirls': appearance.appearance.showgirls, 
                    'parking_info': appearance.appearance.parking_info,
                    'outside_orgs': appearance.appearance.outside_orgs,
                    'performance_required': appearance.appearance.performance_required,
                }
            )
            send_mail(
                'Appearance Reminder','You are scheduled to appear at an event that is coming up soon! Here is the appearance info: \n' + 
                '\n' + 'Customer Contact Information \n' 
                + 'Customer Name: ' 
                + appearance.appearance.customer.first_name 
                + ' ' + appearance.appearance.customer.last_name 
                + '\n' + 'Phone Number: ' 
                + str(appearance.appearance.customer.phone) 
                + '\n' + 'Customer email: ' 
                + appearance.appearance.customer.email 
                + '\n' + ' \n' + 'Appearance Information \n' 
                + 'Name: ' + appearance.appearance.name + '\n' 
                + 'Start Time: ' + str(appearance.appearance.start_time) + '\n' 
                + 'End Time: ' + str(appearance.appearance.end_time) + '\n' 
                + 'Date: ' + str(appearance.appearance.date) + '\n'
                + 'Organization requesting event: ' + appearance.appearance.organization 
                + '\n' + 'Location: ' + appearance.appearance.location 
                + '\n' + 'Description: ' + appearance.appearance.description 
                + '\n' + 'Status: ' + appearance.appearance.status + '\n' + '\n' + 'Thanks and Go Frogs!' 
                ,'superfrog@scheduler.com',
                appearance.superfrog.user.email,
                fail_silently = False,
                html_message = superfrog_reminder
            )
            print("sent mail")

def reject_expired():
    expired_reqs = Appearance.objects.filter(date__lte = datetime.datetime.now() + datetime.timedelta(days=7), status = 'Pending')
    for req in expired_reqs:
        #print(req.name +" will be rejected.")
        customer_reject = render_to_string(
            'customer_reject.html',
            {
                'reason': 'We were unable to fill the request within a week of the appearance.'
            }
        )
        send_mail('Event Request Rejected',
        'We thank you for your event request but Superfrog will not be able to attend due to the reason below:'
        + 'We were unable to fill the request within a week of the appearance.',
        'superfrog@scheduler.com',
        [req.customer.email],
        fail_silently = False,
        html_message = customer_reject)
        req.delete()

@background(schedule=30)
def dayscan():
    set_past()
    superfrog_remind()
    reject_expired()
