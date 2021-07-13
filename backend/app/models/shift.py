from datetime import datetime, date, time
from typing import Optional
from enum import Enum

from app.models.core import IDModelMixin, CoreModel


class ShiftBase(CoreModel):
    name: Optional[str]
    date: Optional[date]
    start_time: Optional[time]
    end_time: Optional[time]


class ShiftCreate(ShiftBase):
    name: str
    date: date
    start_time: time
    end_time: time


class ShiftUpdate(ShiftBase):
    date: Optional[date]
    start_time: Optional[time]
    end_time: Optional[time]


class ShiftInDB(IDModelMixin, ShiftBase):
    name: str
    date: date
    start_time: time
    end_time: time


class ShiftPublic(IDModelMixin, ShiftBase):
    pass
