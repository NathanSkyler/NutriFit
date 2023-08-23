from datetime import date

def calculate_age(birthdate): #incomplete
    today = date.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age

def calculate_calorie_intake(user_stats): #incomplete - account of imperial and metric system
        weight_kg = user_stats.weight
        height_cm = user_stats.height 
        age_years = calculate_age(user_stats.bday)

        if user_stats.gender == "Male":
            base_calories = 10 * weight_kg + 6.25 * height_cm - 5 * age_years + 5
        else:
            base_calories = 10 * weight_kg + 6.25 * height_cm - 5 * age_years - 161

        activity_level_multiplier = {
        "sedentary": 1.2,
        "lightly_active": 1.375,
        "moderately_active": 1.55,
        "very_active": 1.725,
        "extra_active": 1.9 }
        
        activity_level = user_stats.activity_level.lower()
        calorie_intake = base_calories * activity_level_multiplier[activity_level]

        if user_stats.weight_goal == "Lose Weight":  # Lose weight
            if user_stats.fit_goal == "Slow":
                calorie_intake -= 500  # Loose 0.45kg / 1lb per week
            elif user_stats.fit_goal == "Fast":
                calorie_intake -= 1000  # Loose 0.9kg / 2lbs per week
        elif user_stats.weight_goal == "Gain Weight":  # Gain weight
            if user_stats.fit_goal == "Slow":
                    calorie_intake += 250  # Gain 0.22kg / 0.5lbs per week
            elif user_stats.fit_goal == "Fast":
                    calorie_intake += 500  # Gain 0.45kg / 1lb per week

        return calorie_intake

def calculate_protein_intake(calorie_intake, weight_goal):
    if weight_goal == "Lose Weight":
        protein_percentage = 0.4  # 40% for weight loss
    else:
        protein_percentage = 0.3  # 30% for weight maintenance and weight gain

    protein_calories = calorie_intake * protein_percentage
    protein_intake = protein_calories / 4  # Each gram of protein is 4 calories

    return protein_intake

def calculate_carb_intake(calorie_intake):
    carb_percentage = 0.4  # Will always be 40%
    carb_calories = calorie_intake * carb_percentage
    carb_intake = carb_calories / 4  # Each gram of carbs is 4 calories

    return carb_intake

def calculate_fat_intake(calorie_intake, weight_goal):
    if weight_goal == "Lose Weight":
        fat_percentage = 0.2  # 20% for weight loss
    else:
        fat_percentage = 0.3  # 30% for weight maintenance and weight gain

    fat_calories = calorie_intake * fat_percentage
    fat_intake = fat_calories / 9  # Each gram of fat is 9 calories

    return fat_intake
