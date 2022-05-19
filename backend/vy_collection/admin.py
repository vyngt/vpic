from django.contrib import admin
from .models import Album, Tag, Picture, Video


class PictureInline(admin.TabularInline):
    model = Picture


class VideoInline(admin.TabularInline):
    model = Video


class AlbumAdmin(admin.ModelAdmin):
    """Admin interface for Album"""

    inlines = [PictureInline, VideoInline]
    fieldsets = [
        (
            "Album Information",
            {"fields": ["name", "tag", "cover", "created", "modified"]},
        ),
    ]
    list_display = (
        "name",
        "created",
        "modified",
    )
    search_fields = ("name",)
    readonly_fields = ("created", "modified")


class TagAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "created",
        "modified",
    )
    search_fields = ("name",)
    readonly_fields = ("slug", "created", "modified")


class PictureAdmin(admin.ModelAdmin):
    list_display = (
        "image",
        "album",
        "created",
        "modified",
    )
    search_fields = ("album__name", "image")
    readonly_fields = ("created", "modified")


class VideoAdmin(admin.ModelAdmin):
    list_display = ("record", "album", "created", "modified")
    search_fields = ("album__name", "record")
    readonly_fields = ("created", "modified")


admin.site.register(Album, AlbumAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Picture, PictureAdmin)
admin.site.register(Video, VideoAdmin)
