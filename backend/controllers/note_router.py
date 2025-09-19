from fastapi import APIRouter, status, HTTPException
from services.note_service import NoteService
from schemas.schema import NoteCreate, NoteResponse, NoteUpdate
from fastapi import Depends
from session import get_db

router = APIRouter()

@router.get("/notes/{user_id}", status_code=status.HTTP_200_OK)
def get_user_notes(user_id, db=Depends(get_db)):
    note_service = NoteService(db)

    notes = note_service.get_user_notes(user_id)
    return notes


@router.post("/notes", response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
def create_note(note: NoteCreate, db=Depends(get_db)):
    note_service = NoteService(db)
    new_note = note_service.add_note(note.title, note.content, note.color, note.user_id)

    return new_note


@router.delete("/notes/{note_id}", status_code=status.HTTP_200_OK)
def delete_note(note_id, db=Depends(get_db)):
    note_service = NoteService(db)

    if not note_service.get_note(note_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    
    note_service.delete_note(note_id)


@router.put("/notes/{note_id}", response_model=NoteResponse, status_code=status.HTTP_200_OK)
def update_note(note_id, note: NoteUpdate, db=Depends(get_db)):
    note_service = NoteService(db)

    if not note_service.get_note(note_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    
    note = note_service.update_note(note_id, note.title, note.content, note.color)

    return note