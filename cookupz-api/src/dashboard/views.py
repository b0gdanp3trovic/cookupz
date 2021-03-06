from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework import status
from .models import Profile, Offer, Experience, Interest
from .serializers import ProfileSerializer, OfferSerializer, OfferSerializerWithUser, \
     ProfileSerializerUpdateDTO, UserSerializerWithProfile, ExperienceSerializer, InterestsSerializer
from django.contrib.auth.models import User
import os
import cloudinary
import cloudinary.uploader
import cloudinary.api



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

class ProfilePhotoView(APIView):
    def post(self, request, username):
        cloudinary.config( 
            cloud_name = os.environ.get('CLOUDINARY_NAME'), 
            api_key = os.environ.get('CLOUDINARY_API_KEY'), 
            api_secret = os.environ.get('CLOUDINARY_API_SECRET')
        )
        response = cloudinary.uploader.upload(request.data['image'])
        user = User.objects.filter(username=username)[0]
        profile = Profile.objects.filter(user_id = user.id)
        profile.update(photo_url = response['url'])
        profile_serializer = ProfileSerializer(profile[0])
        #profile.update(photo_url = response['url'])
        return Response(data=profile_serializer.data, status=status.HTTP_200_OK)

class ProfileEditView(UpdateAPIView):

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'id'
    def update(self, request, *args, **kwargs):
        experience_serializer = ExperienceSerializer(data = request.data['experience'], many=True)
        experience_serializer.is_valid(raise_exception=True)
        interests_serializer = InterestsSerializer(data = request.data['interests'], many=True)
        interests_serializer.is_valid(raise_exception=True)
        instance = self.get_object()
        instance.location = request.data['location']
        instance.phone_number = request.data['phone_number']
        instance.bio = request.data['bio']
        for experience in experience_serializer.data :
            Experience.objects.create(profile_id = instance.id, where = experience['where'], position = experience['position'])
        for interest in interests_serializer.data :
            Interest.objects.create(profile_id = instance.id, title = interest['title'], int_description = interest['int_description'])
        instance.save()
        serializer = self.get_serializer(instance)          
        return Response(data = serializer.data, status=status.HTTP_200_OK)

class OfferView(APIView):
    def post(self, request, username):
        data = {}
        user = User.objects.filter(username = request.data['username']).first()
        profile = Profile.objects.filter(user = user.id).first()
        data['user'] = user.id
        data['profile'] = profile.id
        data.update(request.data)
        serializer = OfferSerializer(data = data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        else: 
            return Response(data = serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    def get(self, request, username):
        user = User.objects.filter(username = username)[0]
        data = Offer.objects.all().exclude(user = user.id)
        serializer = OfferSerializerWithUser(data, many=True)
        if(serializer.is_valid):
            return Response(data = serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class OfferForUserView(APIView):
    def get(self, request, username):
        user = User.objects.filter(username = username).first()
        offers = Offer.objects.filter(user_id = user.id)
        serializer = OfferSerializer(offers, many=True)
        return Response(data = serializer.data, status =status.HTTP_200_OK)




