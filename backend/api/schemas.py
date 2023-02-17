import json
import pprint

from enum import Enum
from datetime import datetime

from typing import Optional, List, Union, Dict, Any

from pydantic import BaseModel, validator, Json

# class Status(Enum):
#     ocr_failed = False
#     ocr_succeed = True


class ItemSchema(BaseModel):
    amount: int
    description: str
    qty: Optional[int]
    unitPrice: Optional[int]
    payers: List = []


class ReceiptSchema(BaseModel):
    merchant_name: Optional[str]
    date: Union[datetime, str]
    items: List[ItemSchema]
    total: int


class OCRSchema(BaseModel):
    success: bool
    receipts: List[ReceiptSchema]


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
    success: bool
    data: dict

if __name__ == '__main__':
    with open('dummy.json', 'rb') as f:
        # x = json.load(f)
        y = OCRSchema.parse_raw(f.read())
        pprint.pprint(y)
