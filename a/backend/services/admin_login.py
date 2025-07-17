# services/admin_service.py

from firebase_admin import db
from utils import verify_password


def get_admin_by_id(admin_id: str):
    """Firebase에서 admin_id로 관리자 계정 조회"""
    ref = db.reference(f"admins/{admin_id}")
    return ref.get()


def login_admin(admin_id: str, password: str):
    """
    관리자 로그인 처리
    - Firebase에서 admin_id로 관리자 찾기
    - 비밀번호 검증
    """
    admin = get_admin_by_id(admin_id)
    if not admin:
        return None

    if not verify_password(password, admin.get("password_hash")):
        return None

    return admin
