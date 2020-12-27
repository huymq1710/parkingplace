from mongoengine import *
import mongoengine_goodjson as gj 
import datetime

from src.db.base_db import Base

class ParkingSLot(Base):
    name = StringField(required=True)
    lat = FloatField()
    lng = FloatField()
    slots = StringField(require=True)

    
    
    
    
    
    
