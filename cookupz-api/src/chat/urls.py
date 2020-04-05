from django.urls import path
from .views import ChatCreateView, ChatListView
from . import views

urlpatterns = [
    path('create/', ChatCreateView.as_view()),
    path('list/<username>', ChatListView.as_view()),
    path('<str:room_name>/', views.room, name='room'),
]