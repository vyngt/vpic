from django.http import HttpRequest
from oauth2_provider.oauth2_validators import OAuth2Validator


class CustomOAuth2Validator(OAuth2Validator):
    oidc_claim_scope = OAuth2Validator.oidc_claim_scope
    oidc_claim_scope["username"] = "read"
    oidc_claim_scope["email"] = "read"

    def get_additional_claims(self, request: HttpRequest):
        claims = {
            "username": request.user.username,  # type: ignore
            "email": request.user.email,  # type: ignore
        }
        return claims

    def get_discovery_claims(self, request: HttpRequest):
        claims = super().get_discovery_claims(request)
        claims += ["username", "email"]
        return claims

    def get_userinfo_claims(self, request: HttpRequest):
        claims = super().get_userinfo_claims(request)
        claims["username"] = request.user.username  # type: ignore
        claims["email"] = request.user.email  # type: ignore
        return claims
