from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, EventViewSet, RSVPViewSet, SubEventChannelsView
from .views import UserEventsView

router = DefaultRouter()
router.register(r'register', ProfileViewSet, basename='profile')
router.register(r'event', EventViewSet, basename='event')
router.register(r'rsvp', RSVPViewSet, basename='rsvp')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', ProfileViewSet.as_view({'post': 'login'}), name='login'),
    path('profile/', ProfileViewSet.as_view({'get': 'retrieve'}), name='profile'),
    path('logout/', ProfileViewSet.as_view({'post': 'logout'}), name='logout'),
     path('user_events/', UserEventsView.as_view(), name='user-events'),
     path('subevent/<int:subevent_id>/channels/', SubEventChannelsView.as_view(), name='subevent-channels'),
]