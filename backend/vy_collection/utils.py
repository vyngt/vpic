from django.core.files.uploadedfile import UploadedFile
from django.http import HttpRequest
from .models import Picture, Album, Video, Tag  # type: ignore


def save_pictures(album: Album, pictures: list[UploadedFile]):
    for picture in pictures:
        Picture.objects.create(album=album, image=picture)


def save_videos(album: Album, videos: list[UploadedFile]):
    for video in videos:
        Video.objects.create(album=album, record=video)


def create_or_get_tags(tags: str) -> list[Tag]:
    """`tags`: tag1;tag2;tag3;..."""
    _tags = tags.split(";")
    result = []
    for t in _tags:
        tag = t.strip()
        if not tag:
            continue
        tag_obj = Tag.objects.filter(name__iexact=tag)
        if tag_obj.exists():
            result.append(tag_obj[0])
        else:
            result.append(Tag.objects.create(name=tag))
    return result


def get_valid_page(request: HttpRequest) -> int:
    """
    Return valid page number
    """
    page_query = request.GET.get("page", "1")
    page_query = int(page_query) if page_query.isnumeric() else 1
    return page_query
