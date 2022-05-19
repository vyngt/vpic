from django.urls import path
from . import views

app_name = "crawler"

urlpatterns = [
    path("", views.CrawlerView.as_view(), name="index"),
    path("<int:pk>/", views.crawled_site_index, name="default"),
    path("<int:pk>/<path:uri>/", views.crawled_site_view, name="resource"),
]
