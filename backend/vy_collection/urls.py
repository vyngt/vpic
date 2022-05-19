from django.urls import path, include
from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter()
router.register(r"albums", views.AlbumViewSet, basename="album")

# app_name = "vy_collection"

urlpatterns = [
    path("albums/", views.AlbumListView.as_view(), name="album_list"),
    path("albums/<int:pk>/", views.AlbumView.as_view(), name="album_detail"),
    path("albums/<int:pk>/videos/", views.VideoView.as_view(), name="album_video"),
    path("tags/", views.TagListView.as_view(), name="tags"),
    path("tags/<str:slug>/", views.TagView.as_view(), name="tag"),
    path("action/", include(router.urls)),
]
