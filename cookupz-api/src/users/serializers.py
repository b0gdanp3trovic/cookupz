from rest_framework import serializers

from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.validators import UnicodeUsernameValidator



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def save(self):
        returnUser = User.objects.create_user(first_name = self.validated_data['first_name'], last_name = self.validated_data['last_name'],
            username=self.validated_data['username'], email = self.validated_data['email'], password = self.validated_data['password'])
        return returnUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'username']


class UserDTOSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'username']
        
        extra_kwargs = {
            'username': {
                'validators': [UnicodeUsernameValidator()],
            }
        }



    
