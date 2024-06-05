from django.contrib.auth.models import User
from django.db import models
import string
import secrets

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    contact_info = models.CharField(max_length=255)

    def get_user_events(self):
        return self.organized_events.all()
    
    def get_participant_events(self):
        event_participations = self.user.event_participant_set.all()
        events = set([participation.event for participation in event_participations])
        return events

class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    organizer = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='organized_events')
    join_code = models.CharField(max_length=20, unique=True, null=True, blank=True)

    def get_subevents(self):
        return self.subevents.all()

    def save(self, *args, **kwargs):
        if not self.join_code:
            self.join_code = self.generate_join_code()
        super().save(*args, **kwargs)

    def generate_join_code(self):
        characters = string.ascii_letters + string.digits
        join_code = ''.join(secrets.choice(characters) for _ in range(20))
        return join_code

class SubEvent(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='subevents')
    name = models.CharField(max_length=255)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    venue_name = models.CharField(max_length=255)
    venue_location = models.CharField(max_length=255)
    venue_capacity = models.IntegerField()
    capacity = models.IntegerField()

    def save(self, *args, **kwargs):
        if not self.join_code:
            self.join_code = self.generate_join_code()
        super().save(*args, **kwargs)

    def get_channels(self):
        return self.channel_set.all()
    
class Event_Participant(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)


class RSVP(models.Model):
    guest = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='rsvps')
    event = models.ForeignKey(SubEvent, on_delete=models.CASCADE)
    status = models.CharField(max_length=20)