from sqlalchemy.orm import Session
from models.models import User
from schemas.user import UserCreate
from security.config import hash_password


def create_user(db: Session, user: UserCreate):
    db_user = User(email=user.email, hashed_password=hash_password(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Add other CRUD operations (read, update, delete) here