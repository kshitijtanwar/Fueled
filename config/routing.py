from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import channel.routing
from channels.security.websocket import AllowedHostsOriginValidator
from channels.auth import AuthMiddlewareStack, UserLazyObject

application = ProtocolTypeRouter({
    'http': get_asgi_application(),  # Handle traditional HTTP requests
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(channel.routing.websocket_urlpatterns),
        )
    )
})