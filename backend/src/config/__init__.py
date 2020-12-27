from .connect import connect_db

def config(app):
    connect_db()