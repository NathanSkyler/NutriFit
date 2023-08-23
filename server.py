from flask import Flask
from flask import (Flask, render_template, request, flash, session, redirect)
from model import connect_to_db, db
import crud
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def account():
    return render_template('login.html')

@app.route('/home')
def homepage():
    if "email" in session:
        return render_template('homepage.html')
    else:
        return redirect('/')

@app.route('/register', methods = ['POST'])
def register_user():
    
    print(request.json)

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


if __name__ == "__main__":
    connect_to_db(app)
    app.run(
        host = "0.0.0.0", 
        port = 5000,
        debug = True
    )