from fastapi import APIRouter, status, HTTPException, Depends
from session import get_db
from services.category_service import CategoryService
from schemas.schema import CategoryCreate, CategoryResponse

router = APIRouter()

@router.get("/categories", status_code=status.HTTP_200_OK)
def get_categories(db=Depends(get_db)):
    category_service = CategoryService(db)

    return category_service.get_all_categories()

@router.post("/categories", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(category: CategoryCreate, db=Depends(get_db)):
    category_service = CategoryService(db)
    new_category = category_service.create_category(category.name)

    return new_category

@router.delete("/categories/{category_id}", status_code=status.HTTP_200_OK)
def delete_category(category_id, db=Depends(get_db)):
    category_service = CategoryService(db)

    if not category_service.get_category(category_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    
    category_service.delete_category(category_id)