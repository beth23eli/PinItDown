from fastapi import APIRouter
from session import Session
from services.note_service import NoteService
from schemas.schema import NoteCreate
from fastapi import Depends
from session import get_db

router = APIRouter()

@router.get("/notes/{user_id}")
def get_user_notes(user_id, db=Depends(get_db)):
    # db = Session()
    note_service = NoteService(db)

    notes = note_service.get_user_notes(user_id)
    return notes

@router.post("/notes/new")
def create_note(note: NoteCreate, db=Depends(get_db)):
    # db = Session()
    note_service = NoteService(db)
    note_service.add_note(note.title, note.content, note.user_id)

@router.delete("/notes/{note_id}")
def delete_note(note_id, db=Depends(get_db)):
    # db = Session()
    note_service = NoteService(db)

    note_service.delete_note(note_id)