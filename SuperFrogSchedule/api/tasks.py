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
            #print(sa.superfrog.user.first_name + ' ' + sa.superfrog.user.last_name + " has " + appearance.name + " a week from now")

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
