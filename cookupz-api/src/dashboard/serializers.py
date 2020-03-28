from rest_framework import serializers

from dashboard.models import Profile, Offer
from users.serializers import RegisterSerializer

class ProfileSerializer(serializers.ModelSerializer):
    user = RegisterSerializer(required = True)

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'photo_url', 'location', 'phone_number']

    def save(self):
        profile = Profile(
            user = self.validated_data('user'),
            bio = self.validated_data('bio'),
            photo_url = self.validated_data('photo_url'),
            location = self.validated_data('location'),
            phone_number = self.validated_data('phone_number'),
        )
        profile.save()



class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ['user', 'int_users', 'chosen_user', 'description', 'location', 'tag']


