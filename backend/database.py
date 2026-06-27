from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

# sqlite now, postgreSQL later
DATABASE_URL = os.getenv("DATABASE_URL")

# engine connection to db
engine = create_engine(
    DATABASE_URL,

    # sqlite specific, delete later
    connect_args={"check_same_thread": False}
                       
)
# Session info
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()