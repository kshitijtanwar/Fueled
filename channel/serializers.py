from rest_framework import serializers
from .models import Channel, Channel_Participant, Channel_Message

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'

class ChannelParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel_Participant
        fields = '__all__'

class ChannelMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel_Message
        fields = '__all__'