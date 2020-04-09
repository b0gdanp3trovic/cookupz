from django.db import models
from django.contrib.auth.models import User
class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        User,
        on_delete = models.CASCADE,
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
    profile = models.ForeignKey(
        Profile,
        on_delete = models.CASCADE
    )
    title = models.TextField(default=None, blank=True, null=True)
    int_users = models.ManyToManyField(User, related_name='int_offers',default=None, blank=True, null=True)
    chosen_user = models.OneToOneField(User, related_name='chosen_offer', on_delete = models.CASCADE, default=None, blank=True, null=True)
    description = models.TextField(default=None, blank=True, null=True)
    location = models.TextField(default=None, blank=True, null=True)
    tag = models.TextField(default=None, blank=True, null=True)
    

class Experience(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='experience')

    where = models.TextField(default = None, blank=True, null=True)
    position = models.TextField(default = None, blank=True, null=True)
    how_long = models.TextField(default = None, blank=True, null=True)

class Interest(models.Model):
    profile = models.ForeignKey(Profile, on_delete = models.CASCADE, related_name='interests')
    title = models.TextField(default = None, blank=True, null=True)
    int_description = models.TextField(default = None, blank=True, null=True)
