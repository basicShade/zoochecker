import base64
from datetime import datetime
from requests import get
from fastapi import Request, Response

from starlette import status

from api.schemas import CreateReceipt, GetReceipt
from api.server import server, session_maker, store
from data_access.models import Receipt
from sqlalchemy_imageattach.context import store_context


@server.get('/hi')
def get_hi():
    print('hey')
    return Response(status_code=200)

@server.post('/create_receipt', response_model=GetReceipt, status_code=status.HTTP_201_CREATED)
def create_receipt(request: Request, payload: CreateReceipt):
    with session_maker() as session:
        receipt = Receipt(
            created=datetime.utcnow(),
            name=payload.name,
            data={"beer": {"quantity": 2, "total": 100}},
            status='ocr_succeed'

        )

        format, imgstr = payload.image.split(';base64,')
        ext = format.split('/')[-1]
        image_obj = base64.b64decode(imgstr)
        with store_context(store):
            breakpoint()
            image = receipt.image.from_blob(image_obj)
            session.add(image)
            session.add(receipt)
            session.commit()
        receipt = receipt.dict()
    return receipt
