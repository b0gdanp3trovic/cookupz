# chat/views.py
from django.shortcuts import render


from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response


from .models import Chat
from .serializers import ChatSerializer, ChatSerializerWithMessages
from dashboard.serializers import OfferSerializer
from dashboard.models import Offer
from django.contrib.auth.models import User
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
        offer = Offer.objects.filter(id = request.data['offer_id'])[0]
        user = User.objects.filter(username = request.data['username'])[0]
        receiver = User.objects.filter(username = request.data['receiver'])[0]
        print(user)
        offer.int_users.add(user)
        chat.save()
        chat.participants.add(user)
        chat.participants.add(receiver)
        chat.save()
        serializer = ChatSerializer(chat)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class ChatListView(APIView):
    def get(self, request, username):
        chats = Chat.objects.all()
        user = User.objects.filter(username = username)[0]
        result = filter(lambda element: user.username in map(lambda participant: participant.username, element.participants.all()) ,chats)
        serializer = ChatSerializerWithMessages(result, many = True)

        return Response(data = serializer.data, status = status.HTTP_200_OK)


        