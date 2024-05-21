from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    contact_info = models.CharField(max_length=255)

    def get_user_events(self):
        return self.organized_events.all()
    

class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    organizer = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='organized_events')

class SubEvent(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='subevents')
    name = models.CharField(max_length=255)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    venue_name = models.CharField(max_length=255)
    venue_location = models.CharField(max_length=255)
    venue_capacity = models.IntegerField()
    capacity = models.IntegerField()

    def get_channels(self):
        return self.channel_set.all()

class RSVP(models.Model):
    guest = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='rsvps')
    event = models.ForeignKey(SubEvent, on_delete=models.CASCADE)
    status = models.CharField(max_length=20)