from typing import List
from fastapi import APIRouter
router = APIRouter()


@router.get("/")
async def get_all_shifts() -> List[dict]:
    shifts = [
        {"id": 1, "name": "John Doe",
            "date": "07/08/2021", "start": "8:00 AM", "end": "12:00 PM"},
        {"id": 2, "name": "John Doe",
            "date": "07/09/2021", "start": "8:00 AM", "end": "12:00 PM"}
    ]
    return shifts
