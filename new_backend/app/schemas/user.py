from pydantic import BaseModel
from typing import Set, Optional
from datetime import date
from app.models.models import Gender

class PrefsBase(BaseModel):
    age_from: int
    age_to: int
    genders: Set[Gender]
    places_to_avoid: Set[str]

class PrefsCreate(PrefsBase):
    pass

class Prefs(PrefsBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    name: str
    gender: Gender
    birth_date: date
    languages: Set[str]

class UserCreate(UserBase):
    password: str
    prefs: Optional[PrefsCreate] = None

class User(UserBase):
    id: int
    prefs: Optional[Prefs] = None

    class Config:
        orm_mode = True