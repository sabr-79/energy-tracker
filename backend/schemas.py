from pydantic import BaseModel

# This defines the shape of JSON sent from the frontend
class DailyLogSchema(BaseModel):
    sleep: float
    water: int
    energy: int
    fog: int
