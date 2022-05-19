#!/bin/sh

python manage.py shell < entrypoint/connect.py

python manage.py makemigrations accounts
python manage.py migrate
python manage.py makemigrations crawler
python manage.py makemigrations vy_collection
python manage.py migrate


# python manage.py collectstatic  --noinput
gunicorn --bind :8000 backend.wsgi:application --reload
exec "$@"