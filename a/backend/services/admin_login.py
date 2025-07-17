# backend/services/admin_login.py

from fastapi import APIRouter, HTTPException
from sqlalchemy import select, Table, Column, String, MetaData
from backend.core.database import database
from backend.core.schemas import AdminLoginRequest
from backend.util import verify_password

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/login")
async def admin_login(login_req: AdminLoginRequest):
    query = "SELECT * FROM admins WHERE admin_id = :admin_id"
    result = await database.fetch_one(query, values={"admin_id": login_req.admin_id})

    if not result:
        raise HTTPException(status_code=401, detail="존재하지 않는 아이디입니다.")

    if not verify_password(login_req.admin_pw, result["admin_pw"]):
        raise HTTPException(status_code=401, detail="비밀번호가 올바르지 않습니다.")

    return {
        "message": "로그인 성공",
        "admin_name": result["admin_name"],
        "token": "dummy-token"  # TODO: 실제 JWT 발급 가능
    }