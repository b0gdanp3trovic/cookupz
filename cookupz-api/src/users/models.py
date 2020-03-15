from django.db import models

# Create your models here.
class User(models.Model):
    firstname = models.TextField()
    lastname = models.TextField()
    username = models.TextField(default='')
    email = models.EmailField()
    date_of_birth = models.DateField()
    password = models.TextField()


