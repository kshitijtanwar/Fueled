import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Channel_Message, Channel, Channel_Participant
from user.models import Profile

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        # Check if the user is authenticated
        if self.scope['user'].is_authenticated:
            self.sender_profile_id = self.scope['user'].id
            self.room_name = self.scope['url_route']['kwargs']['room_name']
            self.room_group_name = 'chat_%s' % self.room_name

            # Join room group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()
        else:
            # Close the connection if the user is not authenticated
            await self.close()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        message = text_data
        self.sender_profile_id = self.scope['user'].id # Update sender_profile_id

        # Save the message to the database
        if self.sender_profile_id: sender_profile = await database_sync_to_async(Profile.objects.get)(id=self.sender_profile_id)
        if self.sender_profile_id: sender_username = await database_sync_to_async(lambda: sender_profile.user.username)()
        channel = await database_sync_to_async(Channel.objects.get)(ChannelName=self.room_name)
        channel_message = await database_sync_to_async(Channel_Message.objects.create)(
            Channel=channel,
            SenderProfile=sender_profile,
            Message=message
        )

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender_profile_id': self.sender_profile_id,  
                'sender_username': sender_username
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        sender_username = event['sender_username']

        # Check if the sender is the same as the receiver
        #if sender_profile_id != self.sender_profile_id:
        await self.send(text_data=json.dumps({
            'message': message,
            'sender_username': sender_username
        }))
