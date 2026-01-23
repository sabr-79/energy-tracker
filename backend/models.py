from sqlalchemy import Column, Integer, Float
from database import Base

# Specifies the format of the log for db storage
# Does not validate the JSON format of the input
# Only exists after the validation succeeds
# Will store things like time and user_ids in the future
class DailyLog(Base):
    __tablename__ = "daily_logs"
    id = Column(Integer, primary_key=True, index=True)
    sleep = Column(Float)
    water = Column(Float)
    energy = Column(Integer)
    fog = Column(Integer)