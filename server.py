from flask import Flask
from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db, db
import crud
from jinja2 import StrictUndefined
from stats_calculations import calculate_percent_range
from spoonacular import get_recipes_api, format_recipe, get_recipes_by_id, format_saved_recipe

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

@app.route('/get_recipes')
def get_recipes():
        user = crud.get_user_by_email(session["email"])
        user_stats = crud.get_user_stats_by_user_id(user.user_id)

        if user_stats:
            percent_range = calculate_percent_range(user_stats.calorie_intake,
                                    user_stats.protein_intake, 
                                    user_stats.carbs_intake, 
                                    user_stats.fat_intake)

            breakfast_recipes = get_recipes_api(percent_range['breakfast'], 'breakfast')
            lunch_recipes = get_recipes_api(percent_range['lunch'], 'main course')
            dinner_recipes = get_recipes_api(percent_range['dinner'], 'main course')
            snack_recipes = get_recipes_api(percent_range['snack'], 'snack')

            formatted_recipes = {
                'breakfast': format_recipe(breakfast_recipes),
                'lunch': format_recipe(lunch_recipes),
                'dinner': format_recipe(dinner_recipes),
                'snack': format_recipe(snack_recipes)
                }

            return jsonify(formatted_recipes)
        else:
            pass

@app.route('/get_saved_recipes')
def get_saved_recipe():
    user = crud.get_user_by_email(session["email"])
    saved_recipes = crud.get_meals_info(user.user_id)

    recipe_info = format_saved_recipe(saved_recipes)

    return jsonify(recipe_info)


@app.route('/save_recipe', methods=['POST'])
def save_recipe():
    user = crud.get_user_by_email(session["email"])
    saved_recipes = crud.get_saved_meals_by_user(user.user_id)
    recipe_info = request.json

    recipe_by_id = crud.get_meals_by_id(recipe_info["recipe_id"])

    if recipe_by_id:
        if recipe_info["recipe_id"] not in saved_recipes:
            crud.user_saves_meal(recipe_info["recipe_id"], user.user_id)
    else:
        crud.save_meal(recipe_info["recipe_id"], recipe_info["meal_name"], recipe_info["meal_type"],
        recipe_info["calories"], recipe_info["protein"], recipe_info["carbs"], recipe_info["fat"], recipe_info["image"])

        crud.user_saves_meal(recipe_info["recipe_id"], user.user_id)

    return "Saved User Meal"



if __name__ == "__main__":
    connect_to_db(app)
    app.run(
        host = "0.0.0.0", 
        port = 5000,
        debug = True
    )