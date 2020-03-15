from rest_framework import serializers

from dashboard.models import Profile
from users.serializers import RegisterSerializer

class ProfileSerializer(serializers.ModelSerializer):
    user = RegisterSerializer(required = True)

    class Meta:
        model = Profile
        fields = ['user', 'photo_url', 'orders_count', 'location', 'usual_wait', 'phone_number']

    def save(self):
        profile = Profile(
            user = self.validated_data('user'),
            photo_url = self.validated_data('photo_url'),
            orders_count = self.validated_data('orders_count'),
            location = self.validated_data('location'),
            usual_wait = self.validated_data('usual_wait'),
            phone_number = self.validated_data('phone_number'),
        )
        profile.save()


