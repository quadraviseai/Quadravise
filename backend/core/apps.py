from django.apps import AppConfig
from django.db import connections
from django.db.utils import OperationalError
import time
import sys

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        # Prevent running this twice (e.g. reload) or during makemigrations
        if any(x in sys.argv for x in ['makemigrations', 'migrate', 'collectstatic', 'test']):
            return

        db_conn = connections['default']
        try:
            db_conn.cursor()
            print("Database connected successfully.")
        except OperationalError:
            print("Database unavailable.")
            sys.exit(1)
