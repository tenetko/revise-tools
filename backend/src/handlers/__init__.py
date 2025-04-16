from fastapi import APIRouter

from .airate_incorrect_profits_handler import router as airate_router
from .root import router as root_router

api_router = APIRouter()
static_router = APIRouter()

api_router.include_router(airate_router, prefix="/airate")
static_router.include_router(root_router)
