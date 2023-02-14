"""
Описание сервера FastAPI
"""
from fastapi import FastAPI

from starlette.middleware.cors import CORSMiddleware

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sqlalchemy_imageattach
from sqlalchemy_imageattach.stores.fs import HttpExposedFileSystemStore

import settings

server = FastAPI(debug=settings.DEBUG_MODE)

session_maker = sessionmaker(bind=create_engine(settings.DEV_DATABASE_URL))

store = HttpExposedFileSystemStore(settings.IMAGES_FOLDER)

server.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

import api.api