from django.db import models
from user.models import Profile, Event

class Channel(models.Model):
    ChannelName = models.CharField(max_length=255)
    ChannelType = models.CharField(max_length=20)
    Event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='channel')
    Participants = models.ManyToManyField(Profile, through='Channel_Participant', related_name='channels')
    location = models.CharField(max_length=255, null=True, blank=True)
    capacity = models.IntegerField(null=True, blank=True)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)

    def get_participants(self):
        return self.participants.all()

    def get_messages(self):
        return self.channel_message_set.order_by('Timestamp')

class Channel_Participant(models.Model):
    Channel = models.ForeignKey('Channel', on_delete=models.CASCADE)
    ParticipantProfile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='channel_participations')
    Role = models.CharField(max_length=20)

class Channel_Message(models.Model):
    Channel = models.ForeignKey('Channel', on_delete=models.CASCADE)
    SenderProfile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='channel_messages')
    Message = models.TextField()
    Timestamp = models.DateTimeField(auto_now_add=True)