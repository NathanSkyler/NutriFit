import requests
import os
from stats_calculations import calculate_percent_range

def get_recipes_api(dict, meal_type):

    api_key = os.environ.get('apiKey')

    url = "https://api.spoonacular.com/recipes/complexSearch"

    payload = {
        'apiKey': api_key,
        'type': meal_type,
        'minCalories': {dict[0][0]},
        'maxCalories': {dict[0][1]},
        'minProtein': {dict[1][0]},
        'maxProtein': {dict[1][1]},
        'minCarbs': {dict[2][0]},
        'maxCarbs': {dict[2][1]},
        'minFat': {dict[3][0]},
        'maxFat': {dict[3][1]},
        'addRecipeInformation': True,
        'instructionsRequired': True,
        'fillIngredients': True,
        'number': 6
    }

    response = requests.get(url, params=payload)
    response = response.json()
    return response

def format_recipe(api_response):
    formatted_recipes = []

    for recipe in api_response["results"]:
        recipe_id = recipe["id"]
        title = recipe["title"]
        image_url = recipe["image"]
        nutrients = recipe["nutrition"]["nutrients"]
        nutrient_info = {}
        recipe_summary = recipe["summary"]
        ingredients = recipe["extendedIngredients"]

        if "analyzedInstructions" in recipe and recipe["analyzedInstructions"]:
            instructions = recipe["analyzedInstructions"][0].get('steps', 'Not Available')

        for nutrient in nutrients:
            nutrient_name = nutrient["name"]
            nutrient_amount = nutrient["amount"]
            nutrient_info[nutrient_name] = nutrient_amount

        formatted_recipe = {
            "RecipeID": recipe_id,
            "Title": title,
            "Image": image_url,
            "Calories": nutrient_info.get("Calories", "N/A"),
            "Protein": nutrient_info.get("Protein", "N/A"),
            "Carbohydrates": nutrient_info.get("Carbohydrates", "N/A"),
            "Fat": nutrient_info.get("Fat", "N/A"),
            "RecipeSummary": recipe_summary,
            "Instructions": instructions,
            "Ingredients": ingredients
        }

        formatted_recipes.append(formatted_recipe)

    return formatted_recipes

def get_recipes_by_id(id):

    api_key = os.environ.get('apiKey')

    url = f"https://api.spoonacular.com/recipes/{id}/information"

    payload = {
        'apiKey': api_key,
        'includeNutrition': True
    }

    response = requests.get(url, params=payload)
    response = response.json()
    return response

def format_saved_recipe(saved_recipes):
    formatted_recipes = []

    for recipe in saved_recipes:
        meal_name, meal_type, calories, protein, carbs, fat, image_url, user_saved = recipe
        
        formatted_recipe = {
            "Title": meal_name,
            "MealType": meal_type,
            "Calories": calories,
            "Protein": protein,
            "Carbohydrates": carbs,
            "Fat": fat,
            "Image": image_url,
            "UserSaved": user_saved
        }

        formatted_recipes.append(formatted_recipe)

    return formatted_recipes