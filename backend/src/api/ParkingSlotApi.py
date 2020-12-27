from flask import Response, request, jsonify
from flask_restful import Resource
from mongoengine.errors import *
import json
from src.db.parkingslot_db import ParkingSLot
import src.utils.response as response

class ParkingSLotApi(Resource):
    def get(self):
        parking_slot = ParkingSLot.objects()
        return Response(parking_slot.to_json(), mimetype ="application/json" , status=200)
    def post(self):
        body = request.get_json()
        parking_slot = ParkingSLot(**body)
        parking_slot.save()
        return Response(parking_slot.to_json(), mimetype="application/json", status=200)
    
    def put(self):
        name = request.args.get('name')
        slots= "{0:b}".format(int(request.args.get('slots')))
        while (6 - len(slots)):
            slots = "0" +slots            
        parking_slot = ParkingSLot.objects(name=name).first()
        body = {
            "slots":slots
                }
        parking_slot.update(**body)
        return Response(parking_slot.to_json(), mimetype="application/json", status=200)