from mongoengine import *
import mongoengine_goodjson as gj 
import datetime

from src.db.base_db import Base

class Location(Base):
    name = StringField(required=True)
    lat = FloatField()
    lng = FloatField()

    
    
    
    
