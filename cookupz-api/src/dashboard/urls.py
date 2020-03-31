from django.urls import path, include
from . import views
from django.urls import path
from .views import ProfileList, OfferView, ProfilePhotoView


app_name = "dashboard"



urlpatterns = [
  path('profile/<username>', ProfileList.as_view()),
  path('offer', OfferView.as_view()),
  path('photo/<username>', ProfilePhotoView.as_view())
]