from rest_framework import serializers

from dashboard.models import Profile, Offer
from users.serializers import RegisterSerializer, UserDTOSerializer

class ProfileSerializer(serializers.ModelSerializer):
    user = RegisterSerializer(required = True)

    class Meta:
        model = Profile
        fields = ['id', 'user','user_id', 'bio', 'photo_url', 'location', 'phone_number']

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
        fields = ['user', 'profile', 'title', 'int_users', 'chosen_user', 'description', 'location', 'tag']

class OfferSerializerWithUser(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = Offer
        fields = ['profile', 'int_users', 'chosen_user', 'description', 'location', 'tag']



