"""
Описание сервера FastAPI
"""
from fastapi import FastAPI

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sqlalchemy_imageattach

from .. import settings

server = FastAPI(debug=settings.DEBUG_MODE)

session_maker = sessionmaker(bind=create_engine(settings.DEV_DATABASE_URL))

store = sqlalchemy_imageattach.stores.fs.HttpExposedFileSystemStore(
    path=settings.IMAGES_FOLDER,
    base_url=settings.IMAGES_URL
)

print(settings.BASE_DIR)
print(settings.IMAGES_FOLDER)