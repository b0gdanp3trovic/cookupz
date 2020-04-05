from rest_framework import serializers
from users.serializers import UserSerializer
from dashboard.serializers import OfferSerializer
from chat.models import Chat, Message

class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ['id', 'offer_id', 'messages', 'participants']

class MessageSerializer(serializers.ModelSerializer):
    author = UserSerializer(required=True)
    receiver = UserSerializer(required=True)
    class Meta:
        model = Message
        fields = ['id', 'author', 'receiver', 'content', 'timestamp']

class ChatSerializerWithMessages(serializers.ModelSerializer):
    messages = MessageSerializer(many = True, required= True)
    participants = UserSerializer(many=True, required=True)
    class Meta:
        model = Chat
        fields = ['id', 'offer_id', 'participants', 'messages']
