from users.serializers import LoginSerializer


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': LoginSerializer(user, context={'request': request}).data
    }