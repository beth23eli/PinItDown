from app.models.category import Category
from app.models.note import Note
from sqlalchemy.orm import Session

class CategoryService:
    def __init__(self, db: Session):
        self.db = db

    def create_category(self, name: str):
        category = Category(name=name)

        self.db.add(category)
        self.db.commit()
        self.db.refresh(category)

        return category

    def delete_category(self, category_id):
        category = self.db.get(Category, category_id)
        self.db.delete(category)

        self.db.commit()


    def get_category(self, category_id):
        category = self.db.get(Category, category_id)
        return category
    
    def get_all_categories(self):
        return self.db.query(Category).all()
    
    def get_note_category(self, note_id):
        category_id = self.db.get(Note, note_id).category_id
        return category_id
