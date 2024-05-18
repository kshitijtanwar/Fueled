from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import channel.routing

application = ProtocolTypeRouter({
    'http': get_asgi_application(),  # Handle traditional HTTP requests
    'websocket': AuthMiddlewareStack(
        URLRouter(
            channel.routing.websocket_urlpatterns
        )
    ),
})
