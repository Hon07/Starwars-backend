"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Planets, Vehicles, Species, Starships, Favorites
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200




# Get all users


@api.route('/users', methods=["GET"])
def users():
    users = User.query.filter(user.__tablename__=="user").all()
    all_users=[]
    for i in range(len(users)):
        all_users.append(users[i].serialize())
        if len(all_users)>0:
            return jsonify({
                "all users":all_users
            })
        return jsonify({
            "message":"there are no users"
        })

#Route to get each user

@api.route("/users/<int:user>", methods=["GET"])
def get_user(user):
    user = User.query.filter(User.id== user).first()
    if user != None:
        return jsonify({
            "user": user.serialize()
        }), 200
    return jsonify({
        "message":"User not found"
    })

#Create a new user

api.route("/users", methods=["POST"])
def create_user():
    email = request.json.get("email")
    password = request.json.get("password")
    is_active = request.json.get("is_active")
    create_user = User(email = email, password = password, is_active = is_active)
    users = User.query.filter(User.email == email).first()

    if users != None:
        return jsonify({
            "message": "The user already exists"
        })
    db.session.add(create_user)
    db.session.commit()
    return jsonify({
        "message":"user created succesfully"
    }), 201


#Update user

@api.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    email = request.json.get("email") 
    password = request.json.get("password")
    is_active = request.json.get("is_active")
    user = User.query.filter(User.id == user_id).all()

    if len(user)==0:
        return jsonify({
            "message":"User not found"
        }), 404
    updated_user = user[0]
    updated_useruser.email = email
    updated_user.password = password
    updated_user.is_active = is_active
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "message": "User updated succesfully"
    })

#Delete all users

@api.route("/users",methods=["DELETE"])
def delete_users():
    users = User.query.filter(User.__tablename__ == "user").all()
    if len(users)==0:
        return jsonify({
            "message": "No users were found"
        }),404
    for i in range(len(users)):
        db.session.delete(users[i])
        db.session.commit()

    return jsonify({
        "message": "users deleted succesfully"
    }),201

#Delete a user

@api.route("/users<int:user>", methods=["DELETE"])
def delete_user(user):
    user = User.query.filter(User.id== user).first()
    if user == None:
        return jsonify({
            "message":"User does not exist"
        }),404
    db.session.delete(user)
    db.session.commit()
    return jsonify({
        "message": "User deleted succesfully"
    }
    ), 201


#Get favorites

@api.route("/favorites", methods=["GET"])
def favorites():
    favorites = Favorites.query.filter(Favorites.__tablename__ == "favorites").all()
    all_favorites=[0]
    for i in range(len(favorites)):
        all_favorites.append(favorites[i].serialize())
    if len(all_favorites)>0:
        return jsonify({
            "Favorites": all_favorites
        }),200
    return jsonify({
        "message":"There are no favorites"
    })


#Favorites by user

@api.route("/favorites/<int:user_param>", methods=["GET"])
def get_favorites():
    favorites = Favorites.query.filter(Favorites.user_id== user_param).all()
    favorites_list= []
    if favorites == None:
        return jsonify({
            "message": "No favorites were found"
        }), 404
    for i in range(len(favorites)):
        if favorites[i].favorite_type == 'films':
            favorites_film = Films.query.get(favorites[i].element_id)
            if favorites_film != None:
                favorites[i].serialize()["data"] = favorites_film.serialize()
        if favorites[i].favorite_type == 'people':
            favorites_people = People.query.get(favorites[i].element_id)
            if favorites_people != None:
                favorites[i].serialize()["data"] = favorites_people.serialize()
        if favorites[i].favorite_type == 'planets':
            favorites_planet = Planets.query.get(favorites[i].element_id)
            if favorites_planet != None:
                favorites[i].serialize()["data"] = favorites_planet.serialize()
        if favorites[i].favorite_type == 'species':
            favorites_species = Species.query.get(favorites[i].element_id)
            if favorites_species != None:
                favorites[i].serialize()["data"] = favorites_species.serialize()
        if favorites[i].favorite_type == 'starships':
            favorites_starships = Starships.query.get(favorites[i].element_id)
            if favorites_starships != None:
                favorites[i].serialize()["data"] = favorites_starships.serialize()
        if favorites[i].favorite_type == 'vehicles':
            favorites_vehicles = Vehicles.query.get(favorites[i].element_id)
            if favorites_vehicles != None:
                favorites[i].serialize()["data"] = favorites_vehicles.serialize()
        favorite_list.append(favorites[i].serialize())

    return jsonify({
        "Favorites": favorites_list
    }),200