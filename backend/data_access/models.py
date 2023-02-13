"""
Описание sqlalchemy моделей
"""
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Identity, JSON
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy_imageattach.entity import Image, image_attachment

Base = declarative_base()


class Receipt(Base):
    """Receipt model"""
    __tablename__ = 'receipt'

    id = Column(Integer, Identity(start=42, cycle=True), primary_key=True)
    created = Column(DateTime, nullable=False)
    name = Column(String(128), nullable=False)
    image = image_attachment('ReceiptImage')
    data = Column(JSON, nullable=True)
    status = Column(String(16), nullable=False)

    def dict(self):
        return {
            'name': self.name,
            'created': self.created,
            'status': self.status,
            'data': self.data
        }


class ReceiptImage(Base, Image):
    """Receipt image model"""
    __tablename__ = 'receipt_image'

    receipt_id = Column(Integer, ForeignKey('receipt.id'), primary_key=True)
    # receipt = relationship('Receipt')

