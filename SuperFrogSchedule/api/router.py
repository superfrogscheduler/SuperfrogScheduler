from .views import AppearanceViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('apperances', AppearanceViewSet, base_name='appearance')