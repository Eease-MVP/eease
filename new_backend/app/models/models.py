from sqlalchemy import Column, Integer, String, Date, Enum, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from enum import Enum as PyEnum
from sqlalchemy.dialects.postgresql import ARRAY


Base = declarative_base()

class Gender(PyEnum):
    FEMALE = "FEMALE"
    MALE = "MALE"
    NON_BINARY = "NON_BINARY"
    TRANSGENDER = "TRANSGENDER"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    gender = Column(Enum(Gender))
    birth_date = Column(Date)
    languages = Column(ARRAY(String))  # Stored as comma-separated values
    prefs = relationship("Prefs", uselist=False, back_populates="user", cascade="all, delete-orphan")

class Prefs(Base):
    __tablename__ = "prefs"

    id = Column(Integer, primary_key=True, index=True)
    age_from = Column(Integer)
    age_to = Column(Integer)
    genders = Column(ARRAY(Enum(Gender)))  # Stored as comma-separated values
    places_to_avoid = Column(ARRAY(String))  # Stored as comma-separated values
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="prefs")