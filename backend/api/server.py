"""
Описание сервера FastAPI
"""
from fastapi import FastAPI

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .. import settings

server = FastAPI(debug=settings.DEBUG_MODE)

session_maker = sessionmaker(bind=create_engine(settings.DEV_DATABASE_URL))