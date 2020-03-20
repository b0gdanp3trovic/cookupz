from django.db import models
from users.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete = models.CASCADE,
        primary_key = True
    )
    bio = models.TextField(blank = True)
    photo_url = models.TextField()
    location = models.TextField(blank = True)
    phone_number = models.TextField(blank = True)
    
