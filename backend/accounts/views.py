from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response

from oauth2_provider.contrib.rest_framework import (
    OAuth2Authentication,
    TokenHasReadWriteScope,
)


class MeView(APIView):
    authentication_classes = [OAuth2Authentication]
    permission_classes = [TokenHasReadWriteScope]

    def get(self, request: HttpRequest):
        return Response({"OK": "Success"})
