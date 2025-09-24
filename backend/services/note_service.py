from models.note import Note
from sqlalchemy.orm import Session

class NoteService:
    def __init__(self, db: Session):
        self.db = db

    def get_note(self, note_id):
        note = self.db.get(Note, note_id)
        return note

    def add_note(self, title: str, content: str, color: str, user_id: int, category_id: int = None):
        note = Note(title=title, content=content, color=color, user_id=user_id, category_id=category_id)

        self.db.add(note)
        self.db.commit()
        self.db.refresh(note)

        return note
    
    def delete_note(self, note_id):
        note = self.get_note(note_id)
        self.db.delete(note)

        self.db.commit()

        
    def update_note(self, note_id, new_title, new_content, new_color, new_category=None):
        note = self.db.query(Note).filter(Note.id == note_id).first()

        note.title = new_title
        note.content = new_content
        note.color = new_color
        note.category_id = new_category
        
        self.db.commit()
        self.db.refresh(note)

        return note


    def get_user_notes(self, user_id):
        notes = self.db.query(Note).filter(Note.user_id == user_id).all()

        return notes