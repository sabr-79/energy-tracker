from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date, datetime

# for data validation
from pydantic import BaseModel

from database import engine, SessionLocal
from models import Base, DailyLog
from schemas import DailyLogSchema

# db table creation
Base.metadata.create_all(bind=engine)




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




# default msg in backend
@app.get('/')
def index():
    return {"Msg" : "Hello, world!"}

# returns if the button is clicked in frontend
@app.get("/ping")
def ping():
    return {"status": "ok"}

# DailyLog vs DailyLogSchema:
# Take the validated input and store it in the db
@app.post("/daily-log")
def log_day(log: DailyLogSchema):
    db = SessionLocal()
    db_log = DailyLog(
        sleep=log.sleep,
        water=log.water,
        energy=log.energy,
        fog=log.fog,
        log_date = log.log_date or date.today()

    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    db.close()
    return {
            "Msg" : "Day logged", "id": db_log.id,
            }
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/daily-log")
def get_logs(
    month: str = Query(None, description="Format: YYYY-MM"),
    db: Session = Depends(get_db)
):
    query = db.query(DailyLog)
    
    if month:
        start_date = datetime.strptime(month, "%Y-%m").date()
        if start_date.month == 12:
            end_date = start_date.replace(year=start_date.year + 1, month=1, day=1)
        else:
            end_date = start_date.replace(month=start_date.month + 1, day=1)
        
        query = query.filter(DailyLog.log_date >= start_date).filter(DailyLog.log_date < end_date)
    
    logs = query.all()
    return logs  
