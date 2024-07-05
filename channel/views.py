from rest_framework import viewsets
from .models import Channel, Channel_Participant, Channel_Message
from .serializers import ChannelSerializer, ChannelParticipantSerializer, ChannelMessageSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import Event

@method_decorator(csrf_exempt, name='dispatch')
class ChannelViewSet(viewsets.ModelViewSet):
    def initial(self, request, *args, **kwargs):
        request._dont_enforce_csrf_checks = True
        super(ChannelViewSet, self).initial(request, *args, **kwargs)

    def list(self, request, format=None):
        event_id = request.query_params.get('eventID')
        if not event_id:
            return Response({"error": "event_id is required"}, status=400)

        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({"error": "Event does not exist"}, status=404)

        channels = event.get_channel()
        serializer = ChannelSerializer(channels, many=True)
        return Response(serializer.data)

    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer

@method_decorator(csrf_exempt, name='dispatch')
class ChannelParticipantViewSet(viewsets.ModelViewSet):
    def initial(self, request, *args, **kwargs):
        request._dont_enforce_csrf_checks = True
        super(ChannelParticipantViewSet, self).initial(request, *args, **kwargs)

    queryset = Channel_Participant.objects.all()
    serializer_class = ChannelParticipantSerializer

@method_decorator(csrf_exempt, name='dispatch')
class ChannelMessageViewSet(viewsets.ModelViewSet):
    def initial(self, request, *args, **kwargs):
        request._dont_enforce_csrf_checks = True
        super(ChannelMessageViewSet, self).initial(request, *args, **kwargs)

    queryset = Channel_Message.objects.all()
    serializer_class = ChannelMessageSerializer

    def list(self, request, format=None):
        channel_id = request.data.get('Channel')
        if not channel_id:
            return Response({"error": "Channel is required"}, status=400)

        try:
            channel = Channel.objects.get(id=channel_id)
        except Channel.DoesNotExist:
            return Response({"error": "Channel does not exist"}, status=404)

        messages = channel.get_messages()
        serializer = ChannelMessageSerializer(messages, many=True)
        return Response(serializer.data)
