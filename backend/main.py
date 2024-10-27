from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd

from model import demand_predictor

app = FastAPI()

class NewData(BaseModel):
    part_number: str
    date: str
    demand: int



from fastapi.middleware.cors import CORSMiddleware

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.get("/api/get-demand")
async def get_demand():
    data = pd.read_csv("data/historical_data.csv")
    return data.to_dict(orient="records")

@app.post("/api/add-data")
async def add_data(new_data: NewData):
    df = pd.read_csv("data/historical_data.csv")
    new_entry = pd.DataFrame([new_data.dict()])
    df = pd.concat([df, new_entry], ignore_index=True)
    df.to_csv("data/historical_data.csv", index=False)
    return {"status": "data added"}

@app.get("/api/predict-demand")
async def predict_demand():
    predictions = demand_predictor()
    return {"predictions": predictions}

@app.get("/api/read")
async def read_data():
    return {"message": "Hello from the backend!"}

