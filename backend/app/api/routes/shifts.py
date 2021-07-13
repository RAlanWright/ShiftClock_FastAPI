from typing import List
from fastapi import APIRouter, Body, Depends, HTTPException, Path
from starlette.status import HTTP_201_CREATED

from app.models.shift import ShiftCreate, ShiftPublic, ShiftUpdate
from app.db.repositories.shifts import ShiftsRepository
from app.api.dependencies.database import get_repository

router = APIRouter()


@router.post("/", response_model=ShiftPublic, name="shifts:create-shift", status_code=HTTP_201_CREATED)
async def create_new_shift(
        new_shift: ShiftCreate = Body(..., embed=True),
        shifts_repo: ShiftsRepository = Depends(get_repository(ShiftsRepository)),
) -> ShiftPublic:
    created_shift = await shifts_repo.create_shift(new_shift=new_shift)
    return created_shift


@router.get(f"/{id}/", response_model=ShiftPublic, name="shifts:get-shift-by-id")
async def get_shift_by_id(
        id: int, shifts_repo: ShiftsRepository = Depends(get_repository(ShiftsRepository))
) -> ShiftPublic:
    shift = await shifts_repo.get_shift_by_id(id=id)

    if not shift:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="No shift found with that id.")
    return shift


@router.get("/", response_model=List[ShiftPublic], name="shifts:get-all-shifts")
async def get_all_shifts(
        shifts_repo: ShiftsRepository = Depends(get_repository(ShiftsRepository)),
) -> List[ShiftPublic]:
    return await shifts_repo.get_all_shifts()


@router.put("/{id}/", response_model=ShiftPublic, name="shifts:update-shift-by-id")
async def update_shift_by_id(
        id: int = Path(..., ge=1, title="The shift ID to be updated."),
        shift_update: ShiftUpdate = Body(..., embed=True),
        shifts_repo: ShiftsRepository = Depends(get_repository(ShiftsRepository)),
) -> ShiftPublic:
    updated_shift = await shifts_repo.update_shift(id=id, shift_update=shift_update)

    if not updated_shift:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="No shift found with that id.")
    return updated_shift


@router.delete("/{id}/", response_model=int, name="shifts:delete-shift-by-id")
async def delete_shift_by_id(
        id: int = Path(..., ge=1, title="The shift ID to be deleted."),
        shifts_repo: ShiftsRepository = Depends(get_repository(ShiftsRepository)),
) -> int:
    deleted_id = await shifts_repo.delete_shift_by_id(id=id)

    if not deleted_id:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="No shift found with that id.")
    return deleted_id
