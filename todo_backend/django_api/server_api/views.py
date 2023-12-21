"""
    server_api/views.py

    ServerList: GET requests to list all Server objects

    Author information is provided for reference.
    Donato Cappiello (dino.cappiello@gmail.com)
"""

from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics 

from .models import Server
from .serializers import ServerSerializer
    
class ServerList(generics.ListCreateAPIView):
    # List/create Servers.
    queryset = Server.objects.all()
    serializer_class = ServerSerializer

class ServerDetail(generics.RetrieveUpdateDestroyAPIView):
    # Get, Update, Delete single Server by id
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    lookup_url_kwarg = 'server_id'
