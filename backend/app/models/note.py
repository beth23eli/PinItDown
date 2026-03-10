from sqlalchemy import Column, Integer, String, DateTime, func, Text, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Note(Base):
    __tablename__="notes"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=True)
    content = Column(Text, nullable=False)
    color = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.timezone('UTC', func.now()), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)

    user = relationship('User', back_populates='notes')
    category = relationship('Category', back_populates='notes')
