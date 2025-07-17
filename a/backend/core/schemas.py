# backend/schemas.py

from pydantic import BaseModel

class AdminLoginRequest(BaseModel):
    admin_id: str
    admin_pw: str
