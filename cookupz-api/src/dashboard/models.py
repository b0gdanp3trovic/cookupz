from django.db import models
from users.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete = models.CASCADE,
        primary_key = True
    )
    photo_url = models.TextField()
    orders_count = models.IntegerField(blank = True)
    location = models.TextField(blank = True)
    usual_wait = models.TextField(blank = True)
    phone_number = models.TextField(blank = True)
    
