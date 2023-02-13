from pathlib import Path

DEBUG_MODE = True

DEV_DATABASE_URL = 'postgresql://postgres:h_tek14@localhost/zoochecker'

BASE_DIR = Path(__file__).resolve().parent.parent

IMAGES_FOLDER = BASE_DIR.resolve().parent + '/images'
IMAGES_URL = 'static/images/'

