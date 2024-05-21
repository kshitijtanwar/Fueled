from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Event, SubEvent, RSVP

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ('id', 'user', 'contact_info')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer().create(user_data)
        profile = Profile.objects.create(user=user, **validated_data)
        return profile
    

class SubEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubEvent
        fields = ['id', 'name', 'start_datetime', 'end_datetime', 'venue_name', 'venue_location', 'venue_capacity', 'capacity']

class EventSerializer(serializers.ModelSerializer):
    subevents = SubEventSerializer(many=True)

    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'start_date', 'end_date', 'organizer', 'subevents']

    def create(self, validated_data):
        subevents_data = validated_data.pop('subevents')
        event = Event.objects.create(**validated_data)
        for subevent_data in subevents_data:
            SubEvent.objects.create(event=event, **subevent_data)
        return event

class RSVPSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSVP
        fields = ['id', 'guest', 'event', 'status']