from fastapi import APIRouter
from app.api.routes.shifts import router as shifts_router


router = APIRouter()


router.include_router(
    shifts_router, prefix="/shifts", tags=["shifts"])
