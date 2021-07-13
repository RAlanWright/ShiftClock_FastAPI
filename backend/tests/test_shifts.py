import pytest

from httpx import AsyncClient
from fastapi import FastAPI

from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_422_UNPROCESSABLE_ENTITY

from app.models.shift import ShiftCreate

pytestmark = pytest.mark.asyncio


@pytest.fixture
def new_shift():
    return ShiftCreate(
        name="Test Doe",
        date="2021-07-14",
        start_time="08:00",
        end_time="14:00"
    )


class TestShiftsRoutes:

    @pytest.mark.asyncio
    async def test_routes_exist(self, app: FastAPI, client: AsyncClient) -> None:
        res = await client.post(app.url_path_for("shifts:create-shift"), json={})
        assert res.status_code != HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_invalid_input_raises_error(self, app: FastAPI, client: AsyncClient) -> None:
        res = await client.post(app.url_path_for("shifts:create-shift"), json={})
        assert res.status_code == HTTP_422_UNPROCESSABLE_ENTITY


class TestCreateShift:
    async def test_valid_input_create_shift(self, app: FastAPI, client: AsyncClient, new_shift: ShiftCreate) -> None:
        res = await client.post(
            app.url_path_for("shifts:create-shift"), json={"new_shift": new_shift.dict()}
        )
        assert res.status_code == HTTP_201_CREATED

        created_shift = ShiftCreate(**res.json())
        assert created_shift == new_shift
