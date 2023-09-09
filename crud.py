from model import db, Users, UserStats, Meals, SavedMeals, connect_to_db
from sqlalchemy.orm import aliased
from datetime import date, datetime
from stats_calculations import calculate_calorie_intake, calculate_protein_intake, calculate_carb_intake, calculate_fat_intake

def commiting(data):
    db.session.add(data)
    db.session.commit()

def create_user(fname, lname, email, password):
    new_user = Users(fname = fname, lname = lname, email = email, password = password)
    print('successfully added')
    commiting(new_user)
    print(f"Added user {fname} {lname} to DB")
    return new_user

def update_user_stats(stats_id, bday, height, weight, gender, activity_level, fit_goal, weight_goal):
    user = db.session.query(UserStats).filter(UserStats.stats_id == stats_id).first()
    user.bday = date(*map(int, bday.split("-")))
    user.height = height
    user.weight = weight
    user.gender = gender
    user.activity_level = activity_level
    user.weight_goal = weight_goal
    user.fit_goal = fit_goal
    assign_intake_values(user)

    db.session.commit()
    print("User stats updated successfully.")
    return user

def get_stats_by_stats_id(stats_id):
    stats = db.session.query(UserStats).filter(UserStats.stats_id == stats_id).first()
    return stats

def get_user_stats_by_user_id(user_id):
    user_stats = db.session.query(UserStats).filter(UserStats.user_id == user_id).first()
    return user_stats

def get_user_by_email(email):
    return Users.query.filter(Users.email == email).first()

def get_user_by_id(user_id):
    return Users.query.filter(Users.user_id == user_id).first()

def create_user_stats(user_id, bday, height, weight, gender, activity_level, fit_goal, weight_goal):

    bday_date = datetime.strptime(bday, "%Y-%m-%d").date()
    new_stats = UserStats(user_id=user_id, bday=bday_date, height=height, weight=weight, gender=gender,
                            activity_level=activity_level, fit_goal=fit_goal, weight_goal=weight_goal)
    assign_intake_values(new_stats)
    commiting(new_stats)

    print(f"Added user stats for User {user_id}")
    return new_stats

def assign_intake_values(user_stats):
    """Calculate and update derived intake values."""
    user_stats.calorie_intake = calculate_calorie_intake(user_stats)
    user_stats.protein_intake = calculate_protein_intake(user_stats.calorie_intake, user_stats.weight_goal)
    user_stats.carbs_intake = calculate_carb_intake(user_stats.calorie_intake)
    user_stats.fat_intake = calculate_fat_intake(user_stats.calorie_intake, user_stats.weight_goal)

    return user_stats


def create_meal(meal_name, meal_type, calories, protein, carbs, fat, sugar, image):
    new_meal = Meals(meal_name=meal_name, meal_type=meal_type, calories=calories, protein=protein,
                    carbs=carbs, fat=fat, sugar=sugar, image=image)
    
    commiting(new_meal)
    return new_meal

def save_meal(meal_id, meal_name, meal_type, calories, protein, carbs, fat, image, recipe_summary, ingredients, instructions):
    saved_meal = Meals(meal_id = meal_id, meal_name= meal_name,
                            meal_type = meal_type, calories = calories, protein = protein, 
                            carbs = carbs, fat = fat, image = image,
                            recipe_summary = recipe_summary, ingredients = ingredients, instructions = instructions)
    commiting(saved_meal)
    return saved_meal

def user_saves_meal(meal_id, user_id):
    saved_meal = SavedMeals(meal_id=meal_id, user_id=user_id)
    commiting(saved_meal)
    return saved_meal

def resave_meal (user_id, meal_id):
    saved_meal = db.session.query(SavedMeals).filter(SavedMeals.user_id == user_id, SavedMeals.meal_id == meal_id).first()
    saved_meal.user_saved = True
    db.session.commit()
    return saved_meal

def unsave_meal(user_id, meal_id):
    saved_meal = db.session.query(SavedMeals).filter(SavedMeals.user_id == user_id, SavedMeals.meal_id == meal_id).first()
    print(meal_id)
    print(saved_meal)
    saved_meal.user_saved = False
    db.session.commit()
    return saved_meal

def get_saved_meals_by_user(user_id):
    saved_meals = db.session.query(SavedMeals).filter(SavedMeals.user_id == user_id).all()
    user_saved_meals = [meal for meal in saved_meals]

    return user_saved_meals

def get_meals_info(user_id):
    meal_info = (
        db.session.query(
            Meals.meal_name,
            Meals.meal_id,
            Meals.meal_type,
            Meals.calories,
            Meals.protein,
            Meals.carbs,
            Meals.fat,
            Meals.image,
            Meals.recipe_summary,
            Meals.ingredients,
            Meals.instructions,
            SavedMeals.user_saved
        )
        .join(SavedMeals, Meals.meal_id == SavedMeals.meal_id)
        .filter(SavedMeals.user_id == user_id)
        .all()
    )
    return meal_info

def check_if_meal_saved(user_id, recipe_id):
    meal_info = (
        db.session.query(SavedMeals.user_saved)
        .filter(SavedMeals.user_id == user_id, SavedMeals.meal_id == recipe_id)
        .first()
    )
    return meal_info[0] if meal_info else None

def get_meals_by_id(meal_id):
    saved_meals = db.session.query(Meals).filter(Meals.meal_id == meal_id).first()
    return saved_meals

def get_saved_meal_info(user_id, meal_id):
    saved_meal = db.session.query(SavedMeals.user_saved).filter_by(user_id=user_id, meal_id=meal_id).first()

    if saved_meal:
        return saved_meal[0]
    else:
        return None


if __name__ == '__main__':
    from server import app
    connect_to_db(app)