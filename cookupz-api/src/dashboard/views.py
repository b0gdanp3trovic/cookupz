from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile
from .serializers import ProfileSerializer
from django.contrib.auth.models import User



# Create your views here.


class ProfileList(APIView):

    def get(self, request, username):
        users = User.objects.filter(username = username)
        user = users[0]
        if(user):
            profile = Profile.objects.filter(user = user.id)
            serializer = ProfileSerializer(profile, many=True)
            return Response(serializer.data)
        else:
            profiles = Profile.objects.all()
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data)




