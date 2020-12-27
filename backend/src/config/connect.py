from mongoengine import connect 

def connect_db():
    connect (
        db = 'location',
        host = 'mongodb://127.0.0.1:27017'
    )