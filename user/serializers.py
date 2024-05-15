from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Guest, Host

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')  # Added 'email' field
        extra_kwargs = {'password': {'write_only': True}}
        

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    is_host = serializers.BooleanField()

    class Meta:
        model = Profile
        fields = ('user', 'is_host')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        is_host = validated_data.pop('is_host')
        user = User.objects.create_user(**user_data)
        profile = Profile.objects.create(user=user, is_host=is_host)
        return profile