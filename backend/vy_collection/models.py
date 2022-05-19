from django.db import models
from django.utils.text import slugify


def album_location(instance: "Album", filename: str):
    return f"{instance.name}/cover/{filename}"


def picture_location(instance: "Picture", filename: str):
    return f"{instance.album.name}/{filename}"


def video_location(instance: "Video", filename: str):
    return f"{instance.album.name}/video/{filename}"


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(
        max_length=100, unique=True, editable=False, null=True, blank=True
    )
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        slug = slugify(self.name)
        self.name = f"{self.name}".upper()
        self.slug = (
            slug if len(slug) == len(self.name) and slug != "none" else self.name
        )
        super(Tag, self).save(*args, **kwargs)


class Album(models.Model):
    name = models.CharField(max_length=200, unique=True)
    # user = models.ForeignKey(User, related_name="u_albums", on_delete=models.CASCADE)
    tag = models.ManyToManyField(Tag, related_name="t_albums")
    cover = models.ImageField(upload_to=album_location)
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        ordering = ["-created"]


class Picture(models.Model):
    album = models.ForeignKey(Album, related_name="pictures", on_delete=models.CASCADE)
    image = models.ImageField(upload_to=picture_location)
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.image}"

    class Meta:
        ordering = ["id"]


class Video(models.Model):
    album = models.ForeignKey(Album, related_name="videos", on_delete=models.CASCADE)
    record = models.FileField(upload_to=video_location)
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.record}"
