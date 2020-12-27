from src.api.LocationApi import LocationApi
from src.api.ParkingSlotApi import ParkingSLotApi

def initialize_routes(api):   
    #location
    api.add_resource(LocationApi, '/location')
    
    #slot
    api.add_resource(ParkingSLotApi, '/parkingslot')
