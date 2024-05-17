from rest_framework import serializers
from .models import Channel, Channel_Participant, Channel_Message

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['ChannelName', 'ChannelType', 'SubEvent']

class ChannelParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel_Participant
        fields = '__all__'

class ChannelMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel_Message
        fields = '__all__'