from rest_framework import serializers
from .models import INN, Pay


class INNSerializer(serializers.ModelSerializer):
    class Meta:
        model = INN
        fields = ['hash_inn', 'okved2', 'region']


class PaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pay
        fields = '__all__'