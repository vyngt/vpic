from django.http import Http404, HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.views import View
from bs4 import BeautifulSoup
from bs4.element import Tag
import requests
import re

from .models import ADSFilter, ScriptFilter, Domain
from .utils import extract_basename, get_correct_url


def get_filter(filter_type: str = "ads"):
    if filter_type == "ads":
        ads: list[str] = [element.regex_patten for element in ADSFilter.objects.all()]
        return r"|".join(ads) if len(ads) > 0 else None
    elif filter_type == "script":
        scripts: list[str] = [
            element.regex_patten for element in ScriptFilter.objects.all()
        ]
        return r"|".join(scripts) if len(scripts) > 0 else None
    return None


def remove_elements_by_attr(soup: BeautifulSoup, tag: str, attr: str):

    ads_filter = get_filter("ads")
    if not ads_filter:
        return

    for element in soup.find_all(tag):
        if isinstance(element, Tag) and element.has_attr(attr):
            if re.search(ads_filter, element[attr]):  # type: ignore
                element.decompose()


def remove_elements_by_text(soup: BeautifulSoup, tag: str):

    script_filter = get_filter("script")
    if not script_filter:
        return

    for element in soup.find_all(tag):
        if isinstance(element, Tag):
            if re.search(script_filter, element.text):
                element.decompose()


def get_crawled_page(domain_pk: int, *args: str):
    domain: Domain = Domain.objects.get(pk=domain_pk)
    url = get_correct_url(str(domain), "/".join(p for p in args))
    base_url = "https://" + str(domain) + "/"
    text = requests.get(url).text
    soup = BeautifulSoup(text, "html.parser")
    hyperlink = soup.find_all("a")

    # modified to /crawler/
    for a_tag in hyperlink:
        if isinstance(a_tag, Tag) and a_tag.has_attr("href"):
            a_tag["href"] = a_tag["href"].replace(base_url, f"/crawler/{domain_pk}/")  # type: ignore

    remove_elements_by_text(soup, "script")
    remove_elements_by_attr(soup, "script", "src")
    remove_elements_by_attr(soup, "link", "href")
    remove_elements_by_attr(soup, "iframe", "src")

    return soup.prettify()


class CrawlerView(View):
    def get(self, request: HttpRequest):
        return render(request, "crawler/crawler.html")

    def post(self, request: HttpRequest):
        data = request.POST
        hostname = data.get("hostname")
        if hostname:
            try:
                domain = Domain.objects.get(hostname=extract_basename(hostname))
            except Domain.DoesNotExist:
                domain = Domain.objects.create(hostname=hostname)
            domain_pk = domain.pk
            return redirect("crawler:default", pk=domain_pk)
        else:
            raise Http404


def crawled_site_index(request: HttpRequest, pk):
    return HttpResponse(get_crawled_page(pk))


def crawled_site_view(request: HttpRequest, pk, uri):
    return HttpResponse(get_crawled_page(pk, uri))
