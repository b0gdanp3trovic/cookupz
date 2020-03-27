from django.urls import path, include
from . import views
from django.urls import path
from .views import ProfileList


app_name = "dashboard"



urlpatterns = [
  path('profile/<username>', ProfileList.as_view())
]