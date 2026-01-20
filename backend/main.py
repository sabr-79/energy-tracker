from fastapi import FastAPI

app = FastAPI()

@app.get('/')

def index():
    return {"Msg" : "Hello, world!"}

@app.get("/ping")
def ping():
    return {"status": "ok"}


