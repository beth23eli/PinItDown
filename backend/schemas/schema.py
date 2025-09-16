from pydantic import BaseModel

class NoteCreate(BaseModel):
    title: str
    content: str
    user_id: int


class UserCreate(BaseModel):
    name: str
    notes: list[NoteCreate] = []


class UserResponse(BaseModel):
    id: int
    name: str
    class Config:
        orm_mode = True