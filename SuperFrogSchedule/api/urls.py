from django.urls import path, include
from django.conf.urls import url
from .router import router
# from.views import AppearanceByStatusList

from .views import (
    list_by_status,
    appearances,
    detail,
    create,
    events_customer_monthly,
    getEmployee,
    signUp,
    list_by_status_list,
    LoginView,
    acceptAppearance,
    rejectAppearance,
    payroll_detail,
    payroll_appearance,
    email, 
    list_by_status_superfrog,
    )

urlpatterns = [
    url(r'^appearances/$', appearances),
    url(r'^appearances/status/(?P<status>\w+)/$', list_by_status),
    url(r'^appearances/(?P<id>\d+)/$', detail),
    url(r'^events/customer-monthly/(?P<year>\d+)/(?P<month>\d+)/$', events_customer_monthly),   
    url(r'^employees/$', getEmployee),
    url(r'^employeeAppearance/(?P<id>\d+)/(?P<sId>\d+)/$', signUp),
    url(r'^listAppearances/status/(?P<status>\w+)/$', list_by_status_list),
    url(r'^auth/login/$', LoginView.as_view(), name='Login'),
    url(r'adminAccept/(?P<id>\d+)/$',acceptAppearance),
    url(r'adminReject/(?P<id>\d+)/$', rejectAppearance),
    url(r'appearance/(?P<id>\d+)/$', payroll_detail),
    url(r'SuperFrogappearance/status/(?P<status>\w+)/$', payroll_appearance)
    url(r'^email/', email),
    url(r'^landingAppearance/status/(?P<status>\w+)/(?P<sId>\d+)/$', list_by_status_superfrog)
]
