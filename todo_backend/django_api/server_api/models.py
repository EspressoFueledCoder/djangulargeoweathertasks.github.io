"""
    server_api/models.py

    Server: Django model definitions for a Server.

    Author information is provided for reference.
    Donato Cappiello (dino.cappiello@gmail.com)
"""

from django.db import models

from datetime import date

from core.models import TimeStampedModel

# Stores a server
class Server(TimeStampedModel):
    name = models.CharField(max_length=50)
    ip_address = models. GenericIPAddressField()

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = 'server'

        # Set default ordering so more recent tasks are showned in the admin panel
        ordering = ['created_on']

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return f'id: {self.id} - server_name: {self.name} - ip_address: {self.ip_address}'