"""
ASGI config for cookupz_api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cookupz_api.settings')
os.environ['CLOUDINARY_API_KEY'] = '182881756396157'
os.environ['CLOUDINARY_API_SECRET'] = '8-AGJxBDPowoisXELVbLfveFikc'
os.environ['CLOUDINARY_NAME'] = 'dev1pdqyr'

application = get_asgi_application()
