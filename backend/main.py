from flask import Flask
from flask_restful import Api
from src.router.routes import initialize_routes
from src.config import config

app = Flask(__name__)

config (app)
api = Api(app)

initialize_routes(api)