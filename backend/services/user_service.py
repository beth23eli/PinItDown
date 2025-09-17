from models.user import User
from sqlalchemy.orm import Session

class UserService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, name):
        user = User(name=name)

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user
    
    def get_user(self, user_id):
        return self.db.get(User, user_id)
    
    def get_all_users(self):
        return self.db.query(User).all()