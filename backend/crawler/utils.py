import re


def get_correct_url(host: str, path: str, protocol: str = "https"):
    URI = host + path if host[-1] == "/" else "/".join([host, path])
    URL = protocol + "://" + URI
    return URL


def extract_basename(url: str) -> str | None:
    pattern = r"^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)"
    search = re.search(pattern, url)
    if search:
        return search.string
    return None
