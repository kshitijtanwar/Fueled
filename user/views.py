from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, logout
from rest_framework.response import Response
from rest_framework import status
from .models import Profile, Event, RSVP
from .serializers import ProfileSerializer, EventSerializer, RSVPSerializer
from django.contrib.auth import login
from rest_framework.authentication import SessionAuthentication
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.utils import IntegrityError
from rest_framework import permissions
from rest_framework.exceptions import NotAuthenticated

@method_decorator(csrf_exempt, name='dispatch')
class ProfileViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def initial(self, request, *args, **kwargs):
        request._dont_enforce_csrf_checks = True
        super(ProfileViewSet, self).initial(request, *args, **kwargs)

    def get_permissions(self):
        if self.action == 'create' or self.action == 'login':
            self.permission_classes = [AllowAny,]
        else:
            self.permission_classes = [IsAuthenticated,]
        return super(ProfileViewSet, self).get_permissions()

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except IntegrityError:
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    def login(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            profile = Profile.objects.get(user__email=email)
        except Profile.DoesNotExist:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=profile.user.username, password=password)
        if user is not None:
            login(request, user)
            return Response({"status": "Logged in"})
        else:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        instance = self.request.user.profile
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def logout(self, request):
        if not request.user.is_authenticated:
            raise NotAuthenticated("You must be authenticated to access this view.")
        
        logout(request)
        return Response({"status": "Logged out"})

@method_decorator(csrf_exempt, name='dispatch')
class EventViewSet(viewsets.ModelViewSet):
    def initial(self, request, *args, **kwargs):
        request._dont_enforce_csrf_checks = True
        super(EventViewSet, self).initial(request, *args, **kwargs)
    
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

@method_decorator(csrf_exempt, name='dispatch')
class RSVPViewSet(viewsets.ModelViewSet):
    def initial(self, request, *args, **kwargs):
        request._dont_enforce_csrf_checks = True
        super(RSVPViewSet, self).initial(request, *args, **kwargs)

    queryset = RSVP.objects.all()
    serializer_class = RSVPSerializer
    permission_classes = [permissions.IsAuthenticated]