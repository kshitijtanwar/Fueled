from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet

router = DefaultRouter()
router.register(r'register', ProfileViewSet, basename='profile')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', ProfileViewSet.as_view({'post': 'login'}), name='login'),
    path('profile/', ProfileViewSet.as_view({'get': 'retrieve'}), name='profile'),
]