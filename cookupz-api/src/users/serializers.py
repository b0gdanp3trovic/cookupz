from rest_framework import serializers

from users.models import User
from rest_framework_jwt.settings import api_settings



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'firstname', 'lastname', 'username', 'date_of_birth', 'password']
        extra_kwargs = {'password': {'write_only': True}}

        def save(self):
            user = User(
                firstname = self.validated_data['firstname'],
                lastname = self.validated_data['lastname'],
                email = self.validated_data['email'],
                date_of_birth = self.validated_data['date_of_birth'],
            )
            password = self.validated_data['passsword']

            user.save()

class LoginSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=255, read_only=True)


    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token


    class Meta:
        model = User
        fields = ['token', 'email', 'password']
        extra_kwargs = {'password' : {'write_only': True}}
