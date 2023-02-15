import os
from pathlib import Path

DEBUG_MODE = True
SQL_ECHO = False

DEV_DATABASE_URL = 'postgresql://postgres:h_tek14@localhost/zoochecker'

BASE_DIR = Path(__file__).resolve().parent

IMAGES_FOLDER = os.path.join(BASE_DIR, 'images')
