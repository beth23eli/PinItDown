from models.note import Note
from sqlalchemy.orm import Session

class NoteService:
    def __init__(self, db: Session):
        self.db = db

    def get_note(self, note_id):
        note = self.db.get(Note, note_id)
        return note

    def add_note(self, title: str, content: str, user_id: int):
        note = Note(title, content, user_id)

        self.db.add(note)
        self.db.commit()
        self.db.refresh()

        return note
    
    def delete_note(self, note_id):
        note = self.get_note(note_id)
        self.db.delete(note)

        self.db.commit()
        self.db.refresh()

    def get_user_notes(self, user_id):
        notes = self.db.get(Note, user_id)

        return notes