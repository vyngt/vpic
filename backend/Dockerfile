FROM python:3.10.4

LABEL role="Backend Server"

COPY . /code

WORKDIR /code

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
RUN pip install -r requirements.txt


RUN chmod +x entrypoint/entrypoint.sh

# auto migrations
CMD ["sh", "entrypoint/entrypoint.sh"]