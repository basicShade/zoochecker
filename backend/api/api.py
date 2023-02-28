import requests
from time import sleep
import base64
import json
from datetime import datetime
from requests import get
from fastapi import HTTPException, Request, Response

from starlette import status
from starlette.responses import Response

from settings import RECEIPT_OCR_ENDPOINT, USE_DUMMY_OCR, STORE_IMAGES
from api.schemas import CreateReceipt, GetReceipt, PatchReceipt
from api.server import server, session_maker, store
from api.schemas import OCRSchema
from data_access.models import Receipt
from sqlalchemy import update
from sqlalchemy_imageattach.context import store_context

@server.get('/receipts/')        
def get_receipt_list():
    with session_maker() as session:
        receipt = session.query(Receipt).order_by(Receipt.created.desc()).all()[:3]
        return receipt

@server.get('/receipts/{receipt_id}')
def get_receipt(receipt_id: int):
    with session_maker() as session:
        receipt = session.query(Receipt).get(receipt_id)
        if not receipt:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f'Receipt with ID={receipt_id} is not found'
            )
        return receipt

@server.post('/create_receipt/', response_model=GetReceipt, status_code=status.HTTP_201_CREATED)
def create_receipt(payload: CreateReceipt):
    with session_maker() as session:

        format, imgstr = payload.image.split(';base64,')
        ext = format.split('/')[-1]
        image_obj = base64.b64decode(imgstr)

        if USE_DUMMY_OCR:
            data = {}
            with open('api/dummy.json', 'rb') as f:
                data = f.read()
        else:
            data = requests.post(
                RECEIPT_OCR_ENDPOINT,
                data={
                    'api_key': 'TEST',
                    'recognizer': 'auto',
                    'ref_no': 'ocr_python_123',
                },
                files={'file': image_obj}
            ).content

        ocr_results = OCRSchema.parse_raw(data)

        receipt = Receipt(
            created=datetime.utcnow(),
            name=payload.name,
            success=ocr_results.success,
            data=ocr_results.receipts[0].dict()
        )

        with store_context(store):
            session.add(receipt)
            if STORE_IMAGES:
                image = receipt.image.from_blob(image_obj)
                session.add(image)
            session.commit()
        receipt=receipt.dict()

    return receipt

@server.patch('/receipts/{receipt_id}')
def patch_receipt(receipt_id: int, payload: PatchReceipt):
    with session_maker() as session:
        session.query(Receipt).filter_by(id=receipt_id).update({'data': payload.data})
        session.commit()
