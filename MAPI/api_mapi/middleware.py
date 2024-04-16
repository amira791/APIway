# middleware.py
from rest_framework_simplejwt.authentication import JWTAuthentication

class JWTAuthenticationMiddleware(JWTAuthentication):
    
    def authenticate(self, request):
        user, jwt_token = super().authenticate(request)

        if user is None:
            return None
        return user, jwt_token
