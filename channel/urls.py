from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChannelViewSet, ChannelParticipantViewSet, ChannelMessageViewSet

router = DefaultRouter()
router.register(r'', ChannelViewSet)
router.register(r'participants', ChannelParticipantViewSet)
router.register(r'messages', ChannelMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]