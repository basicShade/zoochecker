from enum import Enum
from datetime import datetime

from pydantic import BaseModel, validator

class Status(Enum):
    ocr_failed = 'orc_failed'
    ocr_succeed = 'ocr_succeed'


class CreateReceipt(BaseModel):
    name: str
    image: str

    @validator('*', each_item=False)
    def check_name_is_not_empty(cls, v):
        assert v != '', 'Empty strings are not allowed'
        return v


class GetReceipt(BaseModel):
    name: str
    created: datetime
    status: str
    data: dict