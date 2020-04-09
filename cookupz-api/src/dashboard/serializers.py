from rest_framework import serializers

from users.serializers import UserSerializer
from django.contrib.auth.models import User
from users.serializers import RegisterSerializer
from dashboard.models import Profile, Offer, Experience

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['where', 'position']

class ProfileSerializer(serializers.ModelSerializer):
    user = RegisterSerializer(required = True)
    experience = ExperienceSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['id', 'experience', 'interests', 'user','user_id', 'bio', 'photo_url', 'location', 'phone_number']

    def save(self):
        profile = Profile(
            user = self.validated_data('user'),
            bio = self.validated_data('bio'),
            photo_url = self.validated_data('photo_url'),
            location = self.validated_data('location'),
            phone_number = self.validated_data('phone_number'),
        )
        profile.save()

class ProfileSerializerUpdateDTO(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user_id', 'bio', 'photo_url', 'location', 'phone_number']





class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ['id','user', 'profile', 'title', 'int_users', 'chosen_user', 'description', 'location', 'tag']

class OfferSerializerWithUser(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    int_users = UserSerializer(read_only=True, many=True)
    class Meta:
        model = Offer
        fields = ['id', 'profile', 'int_users', 'chosen_user', 'description', 'location', 'tag']





class UserSerializerWithProfile(serializers.ModelSerializer):
    profile = ProfileSerializerUpdateDTO(read_only=True)

    class Meta:
        model = User
        fields = ['email', 'profile', 'first_name', 'last_name', 'username']





