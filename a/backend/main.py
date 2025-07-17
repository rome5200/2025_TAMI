from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from core.database import database
from routers import admin_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    yield
    await database.disconnect()

app = FastAPI(lifespan=lifespan)

# CORS 미들웨어 등록 (프론트엔드 연결을 위한 설정)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 배포 시에는 실제 프론트 주소로 변경
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 관리자 로그인 라우터 등록
app.include_router(admin_router.router, prefix="/admin", tags=["Admin"])

# 루트 엔드포인트 (상태 확인용)
@app.get("/")
async def root():
    return {"message": "PostgreSQL 연결 성공!"}
