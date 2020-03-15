from django.urls import path, include
from . import views
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from .views import RegistrationView, LoginView


app_name = "users"

urlpatterns = [
   path('register', RegistrationView.as_view(), name="Register"),
   path('login', LoginView.as_view(), name="Login")
]

