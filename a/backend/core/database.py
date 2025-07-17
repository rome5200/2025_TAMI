# a/backend/database.py

from sqlalchemy import create_engine, MetaData
from databases import Database

# PostgreSQL 연결 정보
DATABASE_URL = "postgresql+asyncpg://postgres:tami1234@localhost:5432/TAMI"

# 비동기 DB 핸들러
database = Database(DATABASE_URL)

# SQLAlchemy용 메타데이터
metadata = MetaData()
