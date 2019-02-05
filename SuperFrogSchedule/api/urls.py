from django.urls import path, include
from django.conf.urls import url
from .router import router
# from.views import AppearanceByStatusList

from .views import (
    list_by_status,
    appearances,
    detail,
    create,
    UserViewSet
    )
#for testing login authorization
router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^appearances/$', appearances),
    url(r'^appearances/status/(?P<status>\d+)/$', list_by_status),
    url(r'^appearances/(?P<id>\d+)/$', detail),
    url('', include(router.urls)),
    url('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

