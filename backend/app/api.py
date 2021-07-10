from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

# This will allow cross origin requests on the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# This is the base route
@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to Shift Clock!"}


@app.get("/shift", tags=["shifts"])
async def get_shifts() -> dict:
    return {"data": shifts}


@app.post("/shift", tags=["shifts"])
async def add_shifts(shift: dict) -> dict:
    shifts.append(shift)
    return {
        "data": {"Shift added."}
    }


@app.put("/shift/{id}", tags=["shifts"])
async def update_shift(id: int, date: dict, start: dict, end: dict) -> dict:
    for shift in shifts:
        if int(shift["id"]) == id:
            shift["date"] == date["date"]
            shift["startTime"] == start["startTime"]
            shift["endTime"] == end["endTime"]
            return {
                "data": f"Shift with id {id} has been updated."
            }
        return {
            "data": f"Shift with id {id} not found."
        }


# Dummy data for testing
shifts = [
    {
        "id": "1",
        "date": "07/08/2021",
        "startTime": "8:00 AM",
        "endTime": "12:00 PM"
    },
    {
        "id": "2",
        "date": "07/09/2021",
        "startTime": "8:00 AM",
        "endTime": "12:00 PM"
    },
]
