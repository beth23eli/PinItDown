from pydantic import BaseModel

class NoteCreate(BaseModel):
    title: str
    content: str
    color: str
    user_id: int

class NoteUpdate(BaseModel):
    title: str
    content: str
    color: str

class NoteResponse(BaseModel):
    id: int
    title: str
    content: str
    color: str
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