from django.urls import path, include
from django.conf.urls import url
from .router import router
# from.views import AppearanceByStatusList

from .views import (
    list_by_status,
    appearances,
    detail,
    create,
    getEmployee,
    signUp,
    list_by_status_list
    )
urlpatterns = [
    url(r'^appearances/$', appearances),
    url(r'^appearances/status/(?P<status>\w+)/$', list_by_status),
    url(r'^appearances/(?P<id>\d+)/$', detail),
    url(r'^employees/$', getEmployee),
    url(r'^employeeAppearance/(?P<id>\d+)/$', signUp),
    url(r'^listAppearances/status/(?P<status>\w+)/$', list_by_status_list)
]
