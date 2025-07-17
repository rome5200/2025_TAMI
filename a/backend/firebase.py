#firebase 연동

import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("firebase-key.json")  # Firebase 서비스 계정 키 JSON
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tami-13197-default-rtdb.firebaseio.com/'
})

def get_user_by_username(username: str):
    ref = db.reference("/users")
    users = ref.get() or {}
    for uid, user in users.items():
        if user.get("username") == username:
            return { "id": uid, **user }
    return None
