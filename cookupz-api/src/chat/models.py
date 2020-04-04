from django.db import models
from django.contrib.auth.models import User
from dashboard.models import Offer

# Create your models here.


class Chat(models.Model):
    offer = models.ForeignKey(
        Offer, related_name='chats', on_delete=models.CASCADE
    )
    participants = models.ManyToManyField(
        User, related_name='chats', blank=True)

    def __str__(self):
        return "{}".format(self.pk)

class Message(models.Model):
    author = models.ForeignKey(
        User, related_name='messages', on_delete=models.CASCADE)
    chat = models.ForeignKey( 
        Chat, related_name='messages', on_delete = models.CASCADE
    )
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

    def last_10():
        return Message.objects.order_by('-timestamp').all()[:10]