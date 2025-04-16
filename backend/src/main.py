from fastapi import FastAPI
from fastapi.exception_handlers import request_validation_exception_handler
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from src.handlers import api_router, static_router

app = FastAPI(title="Revise Tools Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(static_router)
app.include_router(api_router, prefix="/api")

app.mount("/", StaticFiles(directory="static"), "static")


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    print(f"OMG! The client sent invalid data!: {await request.form()}\n\n{exc}")
    return await request_validation_exception_handler(request, exc)
