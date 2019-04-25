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
        pass
        customer_feedback = render_to_string(
            'customer_feedback.html',
            {
                'name': appearance.name,
                'customer': appearance.customer.first_name,
            }
        )
        send_mail(
            'How did SuperFrog do?',
            'Thanks for having us, ' + appearance.customer.first_name + "!\n"
            + 'We would love your feedback on your experience with SuperFrog.\n'
            + 'Click here to fill out this survey.'  
            ,'superfrog@scheduler.com',
            [appearance.customer.email],
            fail_silently = False,
            html_message = customer_feedback
        )
        print("feedback")
    
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
                    'name': sa.appearance.name,
                    'date': sa.appearance.date,
                    'start_time': sa.appearance.start_time,
                    'end_time':sa.appearance.end_time,
                    'first_name': sa.appearance.customer.first_name,
                    'last_name':  sa.appearance.customer.last_name,
                    'phone': sa.appearance.customer.phone,
                    'email': sa.appearance.customer.email,
                    'organization': sa.appearance.organization,
                    'location': sa.appearance.location,
                    'description': sa.appearance.description,
                    'status': sa.appearance.status,
                    'special_instructions': sa.appearance.special_instructions,
                    'expenses_and_benefits': sa.appearance.expenses_and_benefits,
                    'cheerleaders': sa.appearance.cheerleaders,
                    'showgirls': sa.appearance.showgirls, 
                    'parking_info': sa.appearance.parking_info,
                    'outside_orgs': sa.appearance.outside_orgs,
                    'performance_required': sa.appearance.performance_required,
                }
            )
            send_mail(
                'Appearance Reminder','You are scheduled to appear at an event that is coming up soon! Here is the appearance info: \n' + 
                '\n' + 'Customer Contact Information \n' 
                + 'Customer Name: ' 
                + sa.appearance.customer.first_name 
                + ' ' + sa.appearance.customer.last_name 
                + '\n' + 'Phone Number: ' 
                + str(sa.appearance.customer.phone) 
                + '\n' + 'Customer email: ' 
                + sa.appearance.customer.email 
                + '\n' + ' \n' + 'Appearance Information \n' 
                + 'Name: ' + sa.appearance.name + '\n' 
                + 'Start Time: ' + str(sa.appearance.start_time) + '\n' 
                + 'End Time: ' + str(sa.appearance.end_time) + '\n' 
                + 'Date: ' + str(sa.appearance.date) + '\n'
                + 'Organization requesting event: ' + sa.appearance.organization 
                + '\n' + 'Location: ' + sa.appearance.location 
                + '\n' + 'Description: ' + sa.appearance.description 
                + '\n' + 'Status: ' + sa.appearance.status + '\n' + '\n' + 'Thanks and Go Frogs!' 
                ,'superfrog@scheduler.com',
                [sa.superfrog.user.email],
                fail_silently = False,
                html_message = superfrog_reminder
            )
            #print("sent mail")

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
