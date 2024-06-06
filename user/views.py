from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, logout
from rest_framework.response import Response
from rest_framework import status
from .models import Profile, Event, RSVP, SubEvent, Event_Participant
from .serializers import ProfileSerializer, EventSerializer, RSVPSerializer, SubEventSerializer
from django.contrib.auth import login
from rest_framework.authentication import SessionAuthentication
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.utils import IntegrityError
from rest_framework import permissions
from rest_framework.exceptions import NotAuthenticated
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

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
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated,]
    def initial(self, request, *args, **kwargs):
        request._dont_enforce_csrf_checks = True
        super(EventViewSet, self).initial(request, *args, **kwargs)

    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def list(self, request, format=None):
        user_id = self.request.user.profile.id
        profile = Profile.objects.get(user_id=user_id)

        organized_events = profile.get_user_events()

        participant_events = profile.get_participant_events()

        all_events = list(set(organized_events) | set(participant_events))

        all_events_data = []
        for event in all_events:
            event_data = EventSerializer(event).data
            event_data['is_host'] = event in organized_events
            all_events_data.append(event_data)

        return Response(all_events_data)


@method_decorator(csrf_exempt, name='dispatch')
class RSVPViewSet(viewsets.ModelViewSet):
    def initial(self, request, *args, **kwargs):
        request._dont_enforce_csrf_checks = True
        super(RSVPViewSet, self).initial(request, *args, **kwargs)

    queryset = RSVP.objects.all()
    serializer_class = RSVPSerializer

@method_decorator(csrf_exempt, name='dispatch')
class SubEventViewSet(viewsets.ModelViewSet):
    def initial(self, request, *args, **kwargs):
        request._dont_enforce_csrf_checks = True
        super(SubEventViewSet, self).initial(request, *args, **kwargs)

    queryset = SubEvent.objects.all()
    serializer_class = SubEventSerializer

    def list(self, request, format=None):
        event_id = request.query_params.get('eventID')
        if not event_id:
            return Response({"error": "event_id is required"}, status=400)

        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({"error": "Event does not exist"}, status=404)

        subevents = event.get_subevents()
        serializer = SubEventSerializer(subevents, many=True)
        return Response(serializer.data)

@method_decorator(csrf_exempt, name='dispatch')
class JoinEventView(APIView):
    def initial(self, request, *args, **kwargs):
        request._dont_enforce_csrf_checks = True
        super(JoinEventView, self).initial(request, *args, **kwargs)

    def post(self, request, join_code, format=None):
        event = get_object_or_404(Event, join_code=join_code)
        user = request.user

        if Event_Participant.objects.filter(event=event, user=user).exists():
            return Response({"message": "You have already joined this event."}, status=status.HTTP_400_BAD_REQUEST)

        Event_Participant.objects.create(event=event, user=user)
        return Response({"message": "You have successfully joined the event."}, status=status.HTTP_200_OK)
