# backend/main.py
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

# CORS 설정 (React와 통신 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 앱 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLite로 가정 (간단한 예제)
def get_user_by_username(username: str):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    conn.close()
    return user

@app.post("/login")
async def login(request: Request):
    data = await request.json()
    username = data.get("username")

    if not username:
        raise HTTPException(status_code=400, detail="Username is required")

    user = get_user_by_username(username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username")

    return {"message": "Login successful", "redirect": "/main"}
