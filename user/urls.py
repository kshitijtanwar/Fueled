from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, EventViewSet, RSVPViewSet, JoinEventView

router = DefaultRouter()
router.register(r'register', ProfileViewSet, basename='profile')
router.register(r'event', EventViewSet, basename='event')
router.register(r'rsvp', RSVPViewSet, basename='rsvp')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', ProfileViewSet.as_view({'post': 'login'}), name='login'),
    path('profile/', ProfileViewSet.as_view({'get': 'retrieve'}), name='profile'),
    path('logout/', ProfileViewSet.as_view({'post': 'logout'}), name='logout'),
    path('join_event/<str:join_code>/', JoinEventView.as_view(), name='join_event'),
]