from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import note_router, user_router, category_router



def create_app():
    app = FastAPI()

    origins = [
        "http://localhost:5173",
        "http://localhost:8080",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )

    app.include_router(user_router.router)
    app.include_router(note_router.router)
    app.include_router(category_router.router)

    return app