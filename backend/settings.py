import os
from pathlib import Path

DEBUG_MODE = False
SQL_ECHO = False

BASE_DIR = Path(__file__).resolve().parent

IMAGES_FOLDER = os.path.join(BASE_DIR, 'images')
STORE_IMAGES = False

RECEIPT_OCR_ENDPOINT = 'https://ocr.asprise.com/api/v1/receipt'
USE_DUMMY_OCR = True

DB = {
    'DB_ENGINE': os.getenv('DB_ENGINE'),
    'DB_NAME': os.getenv('DB_NAME'),
    'POSTGRES_USER': os.getenv('POSTGRES_USER'),
    'POSTGRES_PASSWORD': os.getenv('POSTGRES_PASSWORD'),
    'DB_HOST': os.getenv('DB_HOST'),
    'DB_PORT': os.getenv('DB_PORT')
}

DB_URL = (
    f"{DB.get('DB_ENGINE')}://"
    f"{DB.get('POSTGRES_USER')}:"
    f"{DB.get('POSTGRES_PASSWORD')}@"
    f"{DB.get('DB_HOST')}/"
    f"{DB.get('DB_NAME')}"
)

ALLOW_ORIGINS = [
    'http://localhost:5173'
]