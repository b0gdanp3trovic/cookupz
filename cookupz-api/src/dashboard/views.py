from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile
from .serializers import ProfileSerializer

# Create your views here.


class ProfileList(APIView):

    def get(self, request):
        user_id = request.data.get('userId')
        if(user_id):
            profile = Profile.objects.filter(user = user_id)
            serializer = ProfileSerializer(profile, many=True)
            return Response(serializer.data)
        else:
            profiles = Profile.objects.all()
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data)




