from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import User
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
            if email != '':
                email_list = User.objects.filter(email = email)
                if not email_list:
                    user = serializer.save()
                    Profile.objects.create(user = user, photo_url='', orders_count = 0, location = '', usual_wait = '', phone_number = '')
                    data['response'] = 'Successfully registered!'
                    data['email'] = user.email
                else:
                    data['response'] = 'User with that email already exists.'
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
                    data['token'] = serializer.get_token(user_obj)
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








