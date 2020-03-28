from django.db import models
from django.contrib.auth.models import User
class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete = models.CASCADE,
        primary_key = True
    )
    bio = models.TextField(blank = True)
    my_name=models.TextField(blank=True)
    photo_url = models.TextField()
    location = models.TextField(blank = True)
    phone_number = models.TextField(blank = True)


class Offer(models.Model):
    user = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
    )
    int_users = models.ManyToManyField(User, related_name='int_offers',default=None, blank=True, null=True)
    chosen_user = models.OneToOneField(User, related_name='chosen_offer', on_delete = models.CASCADE, default=None, blank=True, null=True)
    description = models.TextField(default=None, blank=True, null=True)
    location = models.TextField(default=None, blank=True, null=True)
    tag = models.TextField(default=None, blank=True, null=True)
    
