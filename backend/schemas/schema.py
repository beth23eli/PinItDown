from pydantic import BaseModel

class NoteCreate(BaseModel):
    title: str
    content: str
    user_id: int

class NoteUpdate(BaseModel):
    title: str
    content: str

class NoteResponse(BaseModel):
    id: int
    title: str
    content: str
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