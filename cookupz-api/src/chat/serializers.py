from rest_framework import serializers
from users.serializers import UserSerializer
from dashboard.serializers import OfferSerializer
from chat.models import Chat

class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ['id', 'offer_id', 'messages', 'participants']
