from django.urls import path, include
from django.conf.urls import url
from .router import router
# from.views import AppearanceByStatusList

from .views import (
    list_by_status,
    list,
    detail
    )
urlpatterns = [
    url(r'^appearances/$', list),
    url(r'^appearances/status/(?P<status>\d+)/$', list_by_status),
    url(r'^appearances/(?P<id>\d+)/$', detail)

]
