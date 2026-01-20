from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


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


