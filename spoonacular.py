import requests
import os
from stats_calculations import calculate_percent_range
from crud import check_if_meal_saved

def get_recipes_api(meal_type, macro_range, dietType, offset):

    api_key = os.environ.get('apiKey')

    url = "https://api.spoonacular.com/recipes/complexSearch"

    payload = {
        'apiKey': api_key,
        'type': meal_type,
        'minCalories': 0,
        'maxCalories': {macro_range[0][1]},
        'minProtein': 25,
        'maxProtein': 1200,
        'minCarbs': 0,
        'maxCarbs': 1200,
        'minFat': 0,
        'maxFat': 1200,
        'addRecipeInformation': True,
        'instructionsRequired': True,
        'fillIngredients': True,
        'number': 6,
        'diet': dietType,
        'sort': 'healthiness',
        'offset': offset
    }

    response = requests.get(url, params=payload)
    response = response.json()
    return response

def format_recipe(api_response, user_id, percent_range):
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
        else: 
            instructions = ["Not Available"]
            
        for nutrient in nutrients:
            nutrient_name = nutrient["name"]
            nutrient_amount = nutrient["amount"]
            nutrient_info[nutrient_name] = nutrient_amount

        is_meal_saved = check_if_meal_saved(user_id, recipe_id)

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
            "Ingredients": ingredients,
            "IncreaseIngredientsAmount": 0,
            "UserSaved": is_meal_saved
        }
        
        print(percent_range)

        increase_nutrition(formatted_recipe, percent_range)

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
        meal_name, meal_id, meal_type, calories, protein, carbs, fat, image_url, recipe_summary, ingredients, instructions, increase_amount, user_saved = recipe
        
        formatted_recipe = {
            "Title": meal_name,
            "RecipeID": meal_id,
            "MealType": meal_type,
            "Calories": calories,
            "Protein": protein,
            "Carbohydrates": carbs,
            "Fat": fat,
            "Image": image_url,
            "RecipeSummary": recipe_summary,
            "Ingredients": ingredients,
            "Instructions": instructions,
            "UserSaved": user_saved,
            "IncreaseAmount": increase_amount
        }

        formatted_recipes.append(formatted_recipe)

    return formatted_recipes

def increase_nutrition(recipe, percent_range):
    if recipe['Calories'] >= percent_range[0][0]:
        return [recipe]
    
    recipe['Calories'] *= 1.10
    recipe['Protein'] *= 1.10
    recipe['Carbohydrates'] *= 1.10
    recipe['Fat'] *= 1.10
    recipe['IncreaseIngredientsAmount'] += 10
        
    return increase_nutrition(recipe, percent_range)