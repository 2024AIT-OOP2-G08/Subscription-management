from peewee import Model, CharField, IntegerField, DateTimeField
from .db import db

class Contents(Model):
    id = IntegerField(primary_key=True)
    created_at = DateTimeField()

    #名前
    name = CharField()

    #値段
    price = IntegerField()

    #入った日
    entry = DateTimeField()

    #支払い日
    payment_date = DateTimeField()

    class Meta:
        database = db