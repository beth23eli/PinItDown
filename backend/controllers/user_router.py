from fastapi import APIRouter, Depends
from session import Session, get_db
from services.user_service import UserService
from schemas.schema import UserCreate, UserResponse

router = APIRouter()

@router.post("/users/create", response_model=UserResponse)
def create_user(user: UserCreate, db=Depends(get_db)):
    # db = Session()
    user_service = UserService(db)

    return user_service.create_user(user.name)