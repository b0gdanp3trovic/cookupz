from django.urls import path, include
from . import views
from django.urls import path
from .views import RegistrationView, LoginView
from rest_framework_simplejwt import views as jwt_views


app_name = "users"

urlpatterns = [
   path('register', RegistrationView.as_view(), name="Register"),
   path('login', LoginView.as_view(), name="Login"),
   path('token/obtain', jwt_views.TokenObtainPairView.as_view(), name="token_obtain"),
   path('token/refresh', jwt_views.TokenRefreshView.as_view(), name="token-refresh")
]

