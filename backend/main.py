from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
from model import demand_predictor
import os

app = FastAPI()

# Define data model
class NewData(BaseModel):
    part_number: str
    date: str
    demand: int

# Add CORS middleware
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://predictive-demand-analyzer.onrender.com"],  
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Define API endpoints
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

# Run the app on a specified port for Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Render sets this environment variable
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=port)
