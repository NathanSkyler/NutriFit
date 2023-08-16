from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from datetime import date

db = SQLAlchemy()

def connect_to_db(flask_app, db_uri="postgresql:///users", echo = True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)
    print("Connected to DB")

class Users(db.Model):
    """List of users"""
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique = True)
    fname = db.Column(db.String, nullable=False, unique=False)
    lname = db.Column(db.String, nullable=False, unique=False)
    email = db.Column(db.String, nullable = False, unique = True)
    password = db.Column(db.String, nullable = False, unique = False)

    user_stats = db.relationship("User_Stats", back_populates="user")
    saved_meals = db.relationship("Saved_Meals", back_populates="user")

class User_Stats(db.Model):
    """Table of user body stats used to calculate intake"""
    __tablename__ = "user_stats"

    stats_id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    bday = db.Column(db.Date, nullable=False, unique=False)
    height = db.Column(db.Float, nullable = False, unique = False)
    weight = db.Column(db.Float, nullable = False, unique = False)
    gender = db.Column(db.String, nullable = False, unique = False)
    activity_level = db.Column(db.String, nullable = False, unique = False)
    fit_goal = db.Column(db.String, nullable = False, unique = False)
    weight_goal = db.Column(db.Float, nullable = False, unique = False)
    goal_timeline = db.Column(db.String, nullable = False, unique = False)

    calorie_intake = db.Column(db.Integer, nullable=False, unique=False)
    protein_intake = db.Column(db.Integer, nullable = False, unique = False)
    carbs_intake = db.Column(db.Integer, nullable = False, unique = False)
    fat_intake = db.Column(db.Integer, nullable = False, unique = False)
    sugar_intake = db.Column(db.Integer, nullable = False, unique = False)

    user = db.relationship("Users", back_populates="user_stats")

class Meals(db.Model):
    __tablename__ = "meals"

    meal_id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    meal_name = db.Column(db.String, nullable=False, unique=False)
    meal_type = db.Column(db.String, nullable=False, unique=False)
    calories = db.Column(db.Integer, nullable = False, unique = False)
    protein = db.Column(db.Integer, nullable = False, unique = False)
    carbs = db.Column(db.Integer, nullable = False, unique = False)
    fat = db.Column(db.Integer, nullable = False, unique = False)
    sugar = db.Column(db.Integer, nullable = False, unique = False)
    image = db.Column(db.String, nullable = False, unique = False)

    saved_meals = db.relationship("Saved_Meals", back_populates="meal")

class Saved_Meals(db.Model):
    __tablename__ = 'saved_meals'

    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.meal_id'), primary_key=True)

    user = db.relationship("Users", back_populates="saved_meals")
    meal = db.relationship("Meals", back_populates="saved_meals")




if __name__ == '__main__':
    from server import app

    connect_to_db(app)