from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# sqlite now, postgreSQL later
DATABASE_URL = "sqlite:///./app.db"

# engine connection to db
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
                       
)
# Session info
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()