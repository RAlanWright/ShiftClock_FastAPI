from typing import List

from fastapi import HTTPException
from starlette.status import HTTP_400_BAD_REQUEST

from app.db.repositories.base import BaseRepository
from app.models.shift import ShiftCreate, ShiftUpdate, ShiftInDB

CREATE_SHIFT_QUERY = """
    INSERT INTO shifts (name, date, start_time, end_time)
    VALUES (:name, :date, :start_time, :end_time)
    RETURNING id, name, date, start_time, end_time;
"""

GET_SHIFT_BY_ID_QUERY = """
    SELECT id, name, date, start_time, end_time
    FROM shifts
    WHERE id = :id;
"""

GET_ALL_SHIFTS_QUERY = """
    SELECT id, name, date, start_time, end_time
    FROM shifts;
"""

UPDATE_SHIFT_BY_ID_QUERY = """
    UPDATE shifts
    SET name        = :name,
        date        = :date,
        start_time  = :start_time,
        end_time    = :end_time
    WHERE id = :id
    RETURNING id, name, date, start_time, end_time;
"""

DELETE_SHIFT_BY_ID_QUERY = """
    DELETE FROM shifts
    WHERE id = :id
    RETURNING id;
"""


class ShiftsRepository(BaseRepository):
    async def create_shift(self, *, new_shift: ShiftCreate) -> ShiftInDB:
        query_values = new_shift.dict()
        shift = await self.db.fetch_one(query=CREATE_SHIFT_QUERY, values=query_values)

        return ShiftInDB(**shift)

    async def get_shift_by_id(self, *, id: int) -> ShiftInDB:
        shift = await self.db.fetch_one(query=GET_SHIFT_BY_ID_QUERY, values={"id": id})

        if not shift:
            return None

        return ShiftInDB(**shift)

    async def get_all_shifts(self) -> List[ShiftInDB]:
        shift_records = await self.db.fetch_all(query=GET_ALL_SHIFTS_QUERY)

        return [ShiftInDB(**record) for record in shift_records]

    async def update_shift(self, *, id: int, shift_update: ShiftUpdate) -> ShiftInDB:
        shift = await self.get_shift_by_id(id=id)

        if not shift:
            return None

        shift_update_params = shift.copy(update=shift_update.dict(exclude_unset=True))

        try:
            updated_shift = await self.db.fetch_one(
                query=UPDATE_SHIFT_BY_ID_QUERY, values=shift_update_params.dict()
            )
            return ShiftInDB(**updated_shift)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Invalid update params.")

    async def delete_shift_by_id(self, *, id: int) -> int:
        shift = await self.get_shift_by_id(id=id)

        if not shift:
            return None

        deleted_shift = await self.db.execute(query=DELETE_SHIFT_BY_ID_QUERY, values={"id": id})

        return deleted_shift
