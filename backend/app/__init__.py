from fastapi import FastAPI
from controllers import note_router, user_router


def create_app():
    app = FastAPI()

    app.include_router(note_router.router)
    app.include_router(user_router.router)

    return app