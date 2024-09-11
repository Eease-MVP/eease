from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import models, schemas
from .db_setup import init_db, get_db, engine
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .security.config import hash_password
from .security.jwt import create_access_token, Token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta
from contextlib import asynccontextmanager
from .auth_service import authenticate_user, get_current_user
from .models.models import Base
from .schemas.user import User, UserCreate


# uvicorn app.main:app --reload

Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db() 
    yield

app = FastAPI(lifespan=lifespan)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/", response_model=schemas.user.User)
def create_user(user: schemas.user.UserCreate, db: Session = Depends(get_db)):
    db_user = models.models.User(**user.dict(exclude={"prefs", "password"}))
    db_user.hashed_password = hash_password(user.password)
    if user.prefs:
        db_prefs = models.models.Prefs(**user.prefs.dict())
        db_user.prefs = db_prefs
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/me", response_model=schemas.user.User)
async def read_users_me(current_user: models.models.User = Depends(get_current_user)):
    return current_user

@app.get("/users/{user_id}", response_model=schemas.user.User)
def read_user(user_id: int, db: Session = Depends(get_db), current_user: models.models.User = Depends(get_current_user)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)