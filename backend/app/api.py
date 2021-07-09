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
