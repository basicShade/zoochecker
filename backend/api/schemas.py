from enum import Enum
from datetime import datetime

from pydantic import BaseModel

class Status(Enum):
    ocr_failed = 'orc_failed'
    ocr_succeed = 'ocr_succeed'


class CreateReceipt(BaseModel):
    name: str
    image: str


class GetReceipt(BaseModel):
    name: str
    created: datetime
    status: str
    data: dict