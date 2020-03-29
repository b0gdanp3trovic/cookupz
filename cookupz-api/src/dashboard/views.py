from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Profile, Offer
from .serializers import ProfileSerializer, OfferSerializer, UserDTOSerializer, OfferSerializerWithUser
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


class OfferView(APIView):
    def post(self, request):
        data = {}
        user = User.objects.filter(username = request.data['username']).first()
        data['user'] = user.id
        data.update(request.data)
        serializer = OfferSerializer(data = data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        else: 
            return Response(data = serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        data = Offer.objects.all()
        serializer = OfferSerializerWithUser(data, many=True)
        if(serializer.is_valid):
            return Response(data = serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)




