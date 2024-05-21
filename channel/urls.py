from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChannelViewSet, ChannelParticipantViewSet, ChannelMessageViewSet, ChannelMessagesView

router = DefaultRouter()
router.register(r'new', ChannelViewSet)
router.register(r'participants', ChannelParticipantViewSet)
router.register(r'messages', ChannelMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('<int:channel_id>/messages/', ChannelMessagesView.as_view(), name='channel-messages'),
]