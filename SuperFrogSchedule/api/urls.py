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
    getSuperfrog,
    getAdmin,
    signUp,
    list_by_status_list,
    LoginView,
    acceptAppearance,
    rejectAppearance
    )

urlpatterns = [
    url(r'^appearances/$', appearances),
    url(r'^appearances/status/(?P<status>\w+)/$', list_by_status),
    url(r'^appearances/(?P<id>\d+)/$', detail),
    url(r'^events/customer-monthly/(?P<year>\d+)/(?P<month>\d+)/$', events_customer_monthly),   
    url(r'^employee/(?P<id>\d+)/$', getSuperfrog),
    url(r'^get-admin/(?P<id>\d+)/$', getAdmin),
    url(r'^employeeAppearance/(?P<id>\d+)/(?P<sId>\d+)/$', signUp),
    url(r'^listAppearances/status/(?P<status>\w+)/$', list_by_status_list),
    url(r'^auth/login/$', LoginView.as_view(), name='Login'),
    url(r'adminAccept/(?P<id>\d+)/$',acceptAppearance),
    url(r'adminReject/(?P<id>\d+)/$', rejectAppearance)
]
