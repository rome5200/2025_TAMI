# backend/routers/admin_login.py
from fastapi import APIRouter, HTTPException
from core.database import database
from core.schemas import AdminLoginRequest
from utils import verify_password

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/login")
async def admin_login(login_req: AdminLoginRequest):
    query = "SELECT * FROM admins WHERE admin_id = :admin_id"
    result = await database.fetch_one(query, values={"admin_id": login_req.admin_id})
    if not result or not verify_password(login_req.admin_pw, result["admin_pw"]):
        raise HTTPException(status_code=401, detail="아이디 또는 비밀번호가 올바르지 않습니다.")
    return {"message": "로그인 성공", "token": "dummy-token"}