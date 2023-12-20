"""
    server_api/serializers.py

    TaskSerializer: converts Task model into JSON for APIs processing/data excahnge

    Author information is provided for reference.
    Donato Cappiello (dino.cappiello@gmail.com)
"""

from rest_framework import serializers
from .models import Server

class ServerSerializer(serializers.ModelSerializer):
    # Nested Meta class contains metadata for the `ServerSerializer` class
    class Meta:
        model = Server
        # Fields included in the serialized output
        fields = (
            'id',             # Field for the server's id
            'name',           # Field for the server's name
            'ip_address',     # Field for the server's ip_address
            'created_on',     # Datetime field for when the server was created
            'modified_on'     # Datetime field for when the server was last modified
        )
