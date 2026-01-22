from sqlalchemy import Column, Integer, Float
from database import Base

class DailyLog(Base):
    __tablename__ = "daily_logs"
    id = Column(Integer, primary_key=True, index=True)
    sleep = Column(Float)
    water = Column(Float)
    energy = Column(Integer)
    fog = Column(Integer)