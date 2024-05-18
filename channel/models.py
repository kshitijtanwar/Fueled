from django.db import models
from user.models import Profile, SubEvent

class Channel(models.Model):
    ChannelName = models.CharField(max_length=255)
    ChannelType = models.CharField(max_length=20)
    SubEvent = models.ForeignKey(SubEvent, on_delete=models.CASCADE)

class Channel_Participant(models.Model):
    Channel = models.ForeignKey('Channel', on_delete=models.CASCADE)
    ParticipantProfile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='channel_participations')
    Role = models.CharField(max_length=20)

class Channel_Message(models.Model):
    Channel = models.ForeignKey('Channel', on_delete=models.CASCADE)
    SenderProfile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='channel_messages')
    Message = models.TextField()
    Timestamp = models.DateTimeField(auto_now_add=True)