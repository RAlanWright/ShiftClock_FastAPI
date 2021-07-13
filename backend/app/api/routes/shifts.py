from typing import List
from fastapi import APIRouter, Body, Depends
from starlette.status import HTTP_201_CREATED

from app.models.shift import ShiftCreate, ShiftPublic
from app.db.repositories.shifts import ShiftsRepository
from app.api.dependencies.database import get_repository

router = APIRouter()


@router.get("/")
async def get_all_shifts() -> List[dict]:
    shifts = [
        {"id": 1, "name": "John Doe",
         "date": "07/08/2021", "start_time": "8:00 AM", "end_time": "12:00 PM"},
        {"id": 2, "name": "John Doe",
         "date": "07/09/2021", "start_time": "8:00 AM", "end_time": "12:00 PM"}
    ]
    return shifts


@router.post("/", response_model=ShiftPublic, name="shifts:create-shift", status_code=HTTP_201_CREATED)
async def create_new_shift(
        new_shift: ShiftCreate = Body(..., embed=True),
        shifts_repo: ShiftsRepository = Depends(get_repository(ShiftsRepository)),
) -> ShiftPublic:
    created_shift = await shifts_repo.create_shift(new_shift=new_shift)

    return created_shift
