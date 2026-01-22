from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# for data validation
from pydantic import BaseModel

from database import engine, SessionLocal
from models import Base, DailyLog
from schemas import DailyLogSchema

# db table creation
Base.metadata.create_all(bind=engine)

daily_log = []




app = FastAPI()

# CORS: this enables the frontend to request info from backend, otherwise it will be blocked
app.add_middleware(
    CORSMiddleware,

    # currently hosts the frontend
    allow_origins = ["http://localhost:5173"],

    # for future use, allows requests to include cookies, auth tokens, session info for login
    allow_credentials=True,
    
    # allows all http methods
    allow_methods = ["*"],

    # for jwt auth later, also for custom headers
    allow_headers=["*"],

)

class Dailylog(BaseModel):
    sleep: float
    energy: int
    water: float
    fog: int


# default msg in backend
@app.get('/')
def index():
    return {"Msg" : "Hello, world!"}

# returns if the button is clicked in frontend
@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.post("/daily-log")
def log_day(log: DailyLogSchema):
    db = SessionLocal()
    db_log = DailyLog(
        sleep=log.sleep,
        water=log.water,
        energy=log.energy,
        fog=log.fog

    )
    db.add(db_log)
    db.commit()
    db.close()
    return {
            "Msg" : "Day logged",
            }

@app.get("/daily-log")
def get_logs():
    return daily_log

