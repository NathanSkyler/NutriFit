from flask import Flask
from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db, db
import crud
from jinja2 import StrictUndefined
from stats_calculations import calculate_percent_range
from spoonacular import get_recipes_api, format_recipe, get_recipes_by_id, format_saved_recipe
from datetime import datetime
import yelp
from geopy.geocoders import Nominatim

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

"""Main Pages"""

@app.route('/')
def account():
    return render_template('login.html')

@app.route('/home')
def homepage():
    if "email" in session:
        return render_template('homepage.html')
    else:
        return redirect('/')
    
"""Account Activity"""

@app.route('/register', methods = ['POST'])
def register_user():
    
    first_name = request.json.get("fname")
    last_name = request.json.get("lname")
    email = request.json.get("email")
    password = request.json.get("password")
    user = crud.get_user_by_email(email)
    session["first_name"] = first_name

    if user:
        return {
            "success": False, 
            "status": "Email already in use. Please sign in."}
    user = crud.create_user(first_name, last_name, email, password)

    return {
        "success": True, 
        "status": "Account created! Please log in"}

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    user = crud.get_user_by_email(email)
    session["first_name"] = user.fname
    if user is None or password != user.password:
            return {
            "success": False, 
            "status": "The information you submitted does not match our records."}
    else:
        session["email"] = email
        return {"success": True}
    
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')


@app.route('/get_name')
def get_name():
    print("hello",session)
    first_name = session.get("first_name", "")
    return jsonify({'first_name': first_name})

"""User Stats"""

@app.route('/update_stats', methods=['POST'])
def update_stats():
    bday = request.json.get("bday")
    height = int(request.json.get("height"))
    weight = int(request.json.get("weight"))
    gender = request.json.get("gender")
    activity_level = request.json.get("activity_level")
    fit_goal = request.json.get("fit_goal")
    weight_goal = request.json.get("weight_goal")
    user_id = crud.get_user_by_email(session["email"])
    user_stats = crud.get_user_stats_by_user_id(user_id.user_id)

    if user_stats:
        crud.update_user_stats(user_stats.stats_id, bday, height, weight, gender, activity_level, weight_goal, fit_goal)
    else:
        crud.create_user_stats(user_id.user_id, bday, height, weight, gender, activity_level, weight_goal, fit_goal)
    
    return {"success": True}

@app.route('/get_stats')
def get_stats():
        user = crud.get_user_by_email(session["email"])
        user_stats = crud.get_user_stats_by_user_id(user.user_id)

        if user_stats:
            user_stats_dict = {
                "calorie_intake": user_stats.calorie_intake,
                "protein_intake": user_stats.protein_intake,
                "carbs_intake": user_stats.carbs_intake,
                "fat_intake": user_stats.fat_intake
            }

        response = jsonify(user_stats_dict)
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        return response

from datetime import datetime
from flask import jsonify

@app.route('/get_form_stats')
def get_form_stats():
    user = crud.get_user_by_email(session["email"])
    user_stats = crud.get_user_stats_by_user_id(user.user_id)

    if user_stats:
        user_stats_dict = {
            "bday": user_stats.bday.strftime("%Y-%m-%d"),
            "height": user_stats.height,
            "weight": user_stats.weight,
            "gender": user_stats.gender,
            "activityLevel": user_stats.activity_level,
            "fitGoal": user_stats.fit_goal,
            "weightGoal": user_stats.weight_goal
        }
        return jsonify(user_stats_dict)


@app.route('/get_recipes', methods=['POST','GET'])
def get_recipes():
        user = crud.get_user_by_email(session["email"])
        user_stats = crud.get_user_stats_by_user_id(user.user_id)
        dietType = request.json.get("dietType")
        print(dietType)

        if user_stats:
            percent_range = calculate_percent_range(user_stats.calorie_intake,
                                    user_stats.protein_intake, 
                                    user_stats.carbs_intake, 
                                    user_stats.fat_intake)

            breakfast_recipes = get_recipes_api('breakfast', percent_range['breakfast'], dietType, 0)
            lunch_recipes = get_recipes_api('main course', percent_range['lunch'], dietType, 0)
            dinner_recipes = get_recipes_api('main course', percent_range['dinner'],dietType, 6)
            snack_recipes = get_recipes_api('snack', percent_range['snack'], dietType, 0)

            formatted_recipes = {
                'breakfast': format_recipe(breakfast_recipes, user.user_id, percent_range['breakfast'] ),
                'lunch': format_recipe(lunch_recipes, user.user_id, percent_range['lunch']),
                'dinner': format_recipe(dinner_recipes, user.user_id, percent_range['dinner']),
                'snack': format_recipe(snack_recipes, user.user_id, percent_range['snack'])
                }

            return jsonify(formatted_recipes)
        else:
            pass

@app.route('/get_saved_recipes', methods=['GET','POST'])
def get_saved_recipe():
    user = crud.get_user_by_email(session["email"])
    saved_recipes = crud.get_meals_info(user.user_id)
    
    saved_recipes = [recipe for recipe in saved_recipes if recipe[-1]]

    recipe_info = format_saved_recipe(saved_recipes)

    return jsonify(recipe_info)


@app.route('/save_recipe', methods=['POST'])
def save_or_resave_recipe():
    user = crud.get_user_by_email(session["email"])
    recipe_info = request.json
    user_saved_recipe = crud.get_saved_meal_info(user.user_id, recipe_info["recipe_id"])

    if user_saved_recipe == False:
        crud.resave_meal(user.user_id, recipe_info["recipe_id"])
        return "Resaved User Meal"
    elif user_saved_recipe == True:
        crud.unsave_meal(user.user_id, recipe_info["recipe_id"])
        return "Unsaved User Meal"
    else:
        crud.save_meal(recipe_info["recipe_id"], recipe_info["meal_name"], recipe_info["meal_type"],
        recipe_info["calories"], recipe_info["protein"], recipe_info["carbs"], recipe_info["fat"],
        recipe_info["image"], recipe_info["recipe_summary"], recipe_info["ingredients"], recipe_info["instructions"],
        recipe_info["increase_amount"])

        crud.user_saves_meal(recipe_info["recipe_id"], user.user_id)

    return "Saved User Meal"

@app.route('/get_yelp_results', methods=["GET", "POST"])
def get_yelp_results():
    user_latitude = request.json.get("latitude")
    user_longitude = request.json.get("longitude")
    zipcode = request.json.get('zipCode')

    if user_latitude == None:
        geolocator = Nominatim(user_agent="zipcode_to_coords")
        location = geolocator.geocode(f"{zipcode}, USA")
        latitude = location.latitude
        longitude = location.longitude
        yelp_results = yelp.get_restaurants_api(latitude, longitude)
        yelp_results_formatted = yelp.format_yelp_results(yelp_results)

        response_data = {
            "latitude": latitude,
            "longitude": longitude,
            "yelpResults": yelp_results_formatted
        }

        return jsonify(response_data)
    
    yelp_results = yelp.get_restaurants_api(user_latitude, user_longitude)
    yelp_results_formatted = yelp.format_yelp_results(yelp_results)

    return jsonify(yelp_results_formatted)


if __name__ == "__main__":
    connect_to_db(app)
    app.run(
        host = "0.0.0.0", 
        port = 5000,
        debug = True
    )