from sqlalchemy import Column, Integer, String, DateTime, func, Text, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Note(Base):
    __tablename__="notes"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    user_id = Column(Integer, ForeignKey("dbo.users.id"), nullable=False)
    user = relationship('User', back_populates='notes')
