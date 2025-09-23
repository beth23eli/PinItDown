from .base import Base
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship

class Category(Base):
    __tablename__="categories"

    id = Column(Integer, primary_key=True)
    name=Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    notes = relationship('Note', back_populates='category')