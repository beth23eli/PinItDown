from fastapi import APIRouter, Depends, status
from session import get_db
from services.user_service import UserService
from schemas.schema import UserCreate, UserResponse

router = APIRouter()

@router.post("/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db=Depends(get_db)):
    user_service = UserService(db)

    return user_service.create_user(user.name)

@router.get("/users", status_code=status.HTTP_200_OK)
def get_users(db=Depends(get_db)):
    user_service = UserService(db)

    return user_service.get_all_users()