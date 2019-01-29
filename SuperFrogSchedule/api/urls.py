from django.urls import path, include
from django.conf.urls import url
from .router import router
from rest_framework.authtoken.views import ObtainAuthToken
# from.views import AppearanceByStatusList

from rest_framework import routers

from .views import (
    list_by_status,
    appearances,
    detail,
    create,
    superfrog,
    UserViewSet
    )

urlpatterns = [
    url(r'users/', UserViewSet),
    url(r'^superfrogs/$', superfrog),
    url(r'', include (router.urls)),
    url(r'^appearances/$', appearances),
    url(r'^appearances/status/(?P<status>\d+)/$', list_by_status),
    url(r'^appearances/(?P<id>\d+)/$', detail),
    url(r'^auth', ObtainAuthToken.as_view()),
    
]
