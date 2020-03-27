from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer
from dashboard.serializers import ProfileSerializer
from dashboard.models import Profile
from rest_framework import permissions, status
from rest_framework.views import exception_handler
from dashboard.serializers import ProfileSerializer



@api_view(['GET', ])
def current_user(request):
    serializer = UserSerializer(request.user)
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
                    user = serializer.save()
                    profile = Profile(user = user, bio= '', photo_url='', location = '', phone_number = '')
                    profile.save()
                    data['response'] = 'Successfully registered!'
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    data['response'] = 'User with that email or username already exists.'
                    return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            data = serializer.errors
        return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def custom_exception_handler(exc, context):
        # Call REST framework's default exception handler first,
        # to get the standard error response.
        response = exception_handler(exc, context)

        # Now add the HTTP status code to the response.
        if response is not None:
            response.data['status_code'] = response.status_code

        return response









