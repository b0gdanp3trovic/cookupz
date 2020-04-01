from django.urls import path, include
from . import views
from django.urls import path
from .views import ProfileList, OfferView, ProfilePhotoView, ProfileEditView, OfferForUserView


app_name = "dashboard"



urlpatterns = [
  path('profile/<username>', ProfileList.as_view()),
  path('profileedit/<id>', ProfileEditView.as_view()),
  path('offer', OfferView.as_view()),
  path('offer/<username>', OfferForUserView.as_view()),
  path('photo/<username>', ProfilePhotoView.as_view())
]