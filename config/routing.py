from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from channel import consumers

application = ProtocolTypeRouter({
    'websocket': URLRouter([
        re_path(r'ws/messages/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
    ]),
})