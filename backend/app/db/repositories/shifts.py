from app.db.repositories.base import BaseRepository
from app.models.shift import ShiftCreate, ShiftUpdate, ShiftInDB


CREATE_SHIFT_QUERY = """
    INSERT INTO shifts (name, date, start_time, end_time)
    VALUES (:name, :date, :start_time, :end_time)
    RETURNING id, name, date, start_time, end_time;
"""


class ShiftsRepository(BaseRepository):
    async def create_shift(self, *, new_shift: ShiftCreate) -> ShiftInDB:
        query_values = new_shift.dict()
        shift = await self.db.fetch_one(query=CREATE_SHIFT_QUERY, values=query_values)

        return ShiftInDB(**shift)

