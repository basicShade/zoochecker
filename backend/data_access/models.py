"""
Описание sqlalchemy моделей
"""
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Identity, Boolean
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy_imageattach.entity import Image, image_attachment

Base = declarative_base()


class Receipt(Base):
    """Receipt model"""
    __tablename__ = 'receipt'

    id = Column(Integer, Identity(start=42, cycle=True), primary_key=True)
    created = Column(DateTime, nullable=False)
    name = Column(String(128), nullable=False)
    image = image_attachment('ReceiptImage')
    data = Column(JSONB, nullable=True)
    success = Column(Boolean, nullable=False)

    def dict(self):
        return {
            'name': self.name,
            'created': self.created,
            'success': self.success,
            'data': self.data
        }


class ReceiptImage(Base, Image):
    """Receipt image model"""
    __tablename__ = 'receipt_image'

    receipt_id = Column(Integer, ForeignKey('receipt.id'), primary_key=True)
    # receipt = relationship('Receipt')

