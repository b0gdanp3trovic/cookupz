from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, LoginSerializer
from dashboard.serializers import ProfileSerializer
from dashboard.models import Profile
from rest_framework import permissions, status



@api_view(['GET', ])
def current_user(request):
    serializer = LoginSerializer(request.user)
    return Response(serializer.data)




class RegistrationView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = RegisterSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            email = request.data['email']
            username = request.data['username']
            if email != '':
                email_list = User.objects.filter(email = email)
                username = User.objects.filter(username = username)
                if not email_list and not username:
                    print(request.data)
                    serializer.save()
                    data['response'] = 'Successfully registered!'
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    data['response'] = 'User with that email or username already exists.'
                    return Response(data, status=status.HTTP_409_CONFLICT)
        else:
            data = serializer.errors
        return Response(data)

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            email = request.data['email']
            password = request.data['password']
            user_obj = User.objects.filter(email = email).first()
            if email and password and user_obj:
                if password == user_obj.password and user_obj.email == email:
                    data['username'] = user_obj.username 
                    data['userId'] = user_obj.id
                    return Response(data, status = status.HTTP_200_OK)
                else:
                    data['response'] = 'Incorrect email or password.'
                    return Response(data, status = status.HTTP_400_BAD_REQUEST)
            else:
                data['response'] = 'Wrong login credentials.'
        else:
            data['response'] = 'Wrong login credentials.'
        return Response(data, status = status.HTTP_400_BAD_REQUEST)









