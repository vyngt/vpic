from rest_framework.serializers import ModelSerializer
from .models import Album, Picture, Tag, Video


class BaseTagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name", "slug"]


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class AlbumSerializer(ModelSerializer):
    """
    Display: \n
    "id",
    "name",
    "cover",
    "modified",
    "created",
    "tags",
    "has_videos",
    """

    class Meta:
        model = Album
        fields = ["id", "name", "cover", "modified", "created"]

    def to_representation(self, instance: Album):
        ret = super().to_representation(instance)
        ret["has_videos"] = instance.videos.exists()  # type: ignore
        ret["tags"] = BaseTagSerializer(instance.tag.all(), many=True).data  # type: ignore
        return ret


class PictureSerializer(ModelSerializer):
    class Meta:
        model = Picture
        fields = "__all__"


class VideoSerializer(ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"
