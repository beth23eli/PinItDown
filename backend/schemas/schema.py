from typing import Optional
from pydantic import BaseModel

class NoteCreate(BaseModel):
    title: str
    content: str
    color: str
    user_id: int
    category_id: Optional[int] = None

class NoteUpdate(BaseModel):
    title: str
    content: str
    color: str
    category_id: Optional[int] = None

class NoteResponse(BaseModel):
    id: int
    title: str
    content: str
    color: str
    category_id: Optional[int] = None
    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    name: str
    notes: list[NoteCreate] = []


class UserResponse(BaseModel):
    id: int
    name: str
    class Config:
        orm_mode = True


class CategoryCreate(BaseModel):
    name: str

class CategoryResponse(BaseModel):
    id: int
    name: str
    class Config:
        orm_mode = True
