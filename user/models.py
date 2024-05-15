from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    is_host = models.BooleanField(default=False)
    

class Guest(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='guests')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

class Host(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='host')
    name = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255)