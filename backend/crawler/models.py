from django.db import models


class BaseFilter(models.Model):
    regex_patten = models.CharField(max_length=255, unique=True)

    class Meta:
        abstract = True


class Domain(models.Model):
    hostname = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"{self.hostname}"


class ADSFilter(BaseFilter):
    def __str__(self):
        return f"{self.regex_patten}"


class ScriptFilter(BaseFilter):
    """
    for example:
    `<script type="text/javascript">ads script</script>`
    \n
    regex_patten = `"ads script"`
    """

    def __str__(self):
        return f"{self.regex_patten}"
