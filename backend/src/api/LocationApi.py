from flask import Response, request, jsonify
from flask_restful import Resource
from mongoengine.errors import *
import json
from src.db.location_db import Location
import src.utils.response as response

class LocationApi(Resource):
    def get(self):
        location = Location.objects()
        return Response(location.to_json(), mimetype ="application/json" , status=200)
    def post(self):
        body = request.get_json()
        location = Location(**body)
        location.save()
        return Response(location.to_json(), mimetype="application/json", status=200)