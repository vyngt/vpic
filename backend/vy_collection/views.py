from django.http import Http404, HttpRequest
from django.core.paginator import Paginator
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from oauth2_provider.contrib.rest_framework import (
    OAuth2Authentication,
    TokenHasReadWriteScope,
)
from .models import Album, Tag
from .serializers import (
    AlbumSerializer,
    PictureSerializer,
    TagSerializer,
    VideoSerializer,
)


from .utils import save_pictures, create_or_get_tags, get_valid_page
from app_utils.utils import ModelOperator


# Album =============================================================
def get_album_list_context(request: HttpRequest, pagination: int = 5):
    page_query = get_valid_page(request)

    page = Paginator(Album.objects.all(), pagination)
    page = page.get_page(page_query)

    pages = page.paginator.get_elided_page_range(page.number)  # type: ignore
    elided_pages = [p for p in pages]

    album_serializer = AlbumSerializer(page.object_list, many=True)

    context = {
        "albums": album_serializer.data,
        "page": {
            "current": page.number,
            "elided_pages": elided_pages,
            "num_pages": page.paginator.num_pages,
        },
    }
    return context


class AlbumListView(APIView):
    def get(self, request: HttpRequest):
        context = get_album_list_context(request)
        return Response(context)


class AlbumView(APIView):
    def get(self, request: HttpRequest, pk: int):
        try:
            album = Album.objects.get(pk=pk)
        except Album.DoesNotExist:
            raise Http404

        page_query = get_valid_page(request)

        page = Paginator(album.pictures.all(), 8)
        page_range = [p for p in page.page_range]
        page = page.get_page(page_query)

        album_serializer = AlbumSerializer(album)
        picture_serializer = PictureSerializer(page.object_list, many=True)

        context = {
            "album": album_serializer.data,
            "pictures": picture_serializer.data,
            "page": {"current": page.number, "range": page_range},
        }
        return Response(context)


# Tag =================================================
class TagListView(APIView):
    def get(self, request: HttpRequest):
        serializer = TagSerializer(Tag.objects.order_by("name"), many=True)
        context = {"tags": serializer.data}
        return Response(context)


class TagView(APIView):
    def get(self, request: HttpRequest, slug: str):
        page_query = get_valid_page(request)
        try:
            tag = Tag.objects.get(slug=slug)
        except Tag.DoesNotExist:
            raise Http404

        page = Paginator(tag.t_albums.order_by("-created"), 5)  # type: ignore
        page = page.get_page(page_query)

        elided_pages = page.paginator.get_elided_page_range(page.number)
        elided_pages = [p for p in elided_pages]

        album_serializer = AlbumSerializer(page.object_list, many=True)
        tag_serializer = TagSerializer(tag)

        context = {
            "albums": album_serializer.data,
            "tag": tag_serializer.data,
            "page": {
                "current": page.number,
                "elided_pages": elided_pages,
                "num_pages": page.paginator.num_pages,
            },
        }
        return Response(context)


# Video =================================================
class VideoView(APIView):
    def get(self, request: HttpRequest, pk: int):
        page_query = get_valid_page(request)

        album = Album.objects.get(pk=pk)

        page = Paginator(album.videos.order_by("created"), 1)
        page_range = [p for p in page.page_range]
        page = page.get_page(page_query)

        album_serializer = AlbumSerializer(album)
        video_serializer = VideoSerializer(page.object_list, many=True)
        context = {
            "album": album_serializer.data,
            "videos": video_serializer.data,
            "page": {
                "current": page.number,
                "range": page_range,
            },
        }
        return Response(context)


# =============================================================================


class AlbumViewSet(ViewSet):
    authentication_classes = [OAuth2Authentication]
    permission_classes = [TokenHasReadWriteScope]

    def extract_data(self, request: HttpRequest):
        """Extract data"""
        _name = request.POST.get("name")
        _tags = request.POST.get("tags")
        _cover = request.FILES.get("cover")
        _pictures = request.FILES.getlist("pictures")

        if not _name or not _tags or not _cover:
            return None
        elif not any(tag.strip() for tag in _tags.split(";")):
            return None
        else:
            return _name, _tags, _cover, _pictures

    def list(self, request: HttpRequest):
        context = get_album_list_context(request, pagination=9)
        return Response(context)

    def create(self, request: HttpRequest):
        data = self.extract_data(request)

        if not data:
            return Response({"error": True, "message": "missing information"})

        name, __tags, cover, pictures = data

        if Album.objects.filter(name=name).exists():
            return Response({"error": True, "message": "album already exists"})

        album = Album.objects.create(name=name, cover=cover)
        tags = create_or_get_tags(__tags)
        album.tag.add(*tags)
        album.save()

        save_pictures(album, pictures)

        return Response({"error": False, "message": f"{album.name} has been created"})

    def retrieve(self, request: HttpRequest, pk: str):
        obj = ModelOperator.get(Album, pk=pk)
        if not obj:
            raise Http404
        serializer = AlbumSerializer(obj)
        return Response(serializer.data)

    def update(self, request: HttpRequest, pk: str):
        return Response({"error": True, "message": "..."})

    def delete(self, request: HttpRequest, pk: str):
        return Response({"error": True, "message": "..."})


class PictureViewSet(ViewSet):
    pass


class VideoViewSet(ViewSet):
    pass
