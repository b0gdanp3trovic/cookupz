# chat/views.py
from django.shortcuts import render


from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response


from .models import Chat
from .serializers import ChatSerializer
from dashboard.serializers import OfferSerializer
from dashboard.models import Offer
def index(request):
    return render(request, 'chat/index.html')

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name,
        'username' : request.user.username
    })




class ChatCreateView(APIView):
    def post(self, request):
        data = request.data
        chat = Chat(offer_id= request.data['offer_id'])
        chat.save()
        serializer = ChatSerializer(chat)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
        