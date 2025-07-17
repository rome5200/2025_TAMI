# hash_password_test.py
from util import hash_password

# 예시 비밀번호 해싱
plain = "admin1234"
hashed = hash_password(plain)

print(f"admin1234 → {hashed}")
