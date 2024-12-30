from peewee import SqliteDatabase
from .db import db
from .contents import Contents

Models = [Contents]

def initialize_database():
    db.connect()
    db.create_tables(Models, safe=True)
    db.close()