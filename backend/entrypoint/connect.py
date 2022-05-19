import time

print("Connecting...")

while True:
    from django.db import connections
    from django.db.utils import OperationalError

    conn = connections["default"]
    try:
        c = conn.cursor()
        print("Postgres: Ready!")
        break
    except OperationalError:
        print("Postgres: Not Ready!!")
        time.sleep(1.25)

print("Connected")
