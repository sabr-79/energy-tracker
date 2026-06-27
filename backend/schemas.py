from pydantic import BaseModel
from datetime import date
from typing import Optional

# This defines the shape of JSON sent from the frontend
# Not like the dailylog class in main.py, this exists only at request time
# For type validation 
class DailyLogSchema(BaseModel):
    sleep: float
    water: int
    energy: int
    fog: int
    log_date: Optional[date] = None
