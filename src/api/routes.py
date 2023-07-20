"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Planets, Vehicles, Species, Starships, Favorites, People, Films
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
def get_users():
    users = User.query.all()
    all_users = [user.serialize() for user in users]
    if len(all_users) > 0:
        return jsonify({
            "all users": all_users
        })
    else:
        return jsonify({
            "message": "there are no users"
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

@api.route("/users", methods=["POST"])
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
def get_favorites():
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
def get__user_favorites():
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


#add favorite

@api.route("/favorites", methods=["POST"])
def create_favorite():
    favorite_type = request.json.get("favorite_type")
    element_id = request.json.get("element_id")
    create_favorite = Favorites(favorite_type = favorite_type, element_id = element_id)
    favorites = Favorites.query.filter(Favorites.favorite_type == favorite_type and Favorites.element_id == element_id).first()

    if favorites != None:
        return jsonify({
            "msg":"Already favorite "
        }), 404
    db.session.add(post_favorite)
    db.session.commit()
    return jsonify({
        "msg":"Favorite created successfully"
    })

#delete all favorites

@api.route('/favorites/', methods=['DELETE'])
def delete_all_favorites():
    favorites = Favorites.query.filter(Favorites.__tablename__ == "favorites").all()

    if len(favorites) == 0:

        return jsonify({
            "msg":"There are no favorites to delete"
        }), 404

    for i in range(len(favorites)):
        db.session.delete(favorites[i])
        db.session.commit()

    return jsonify({
        "msg":"all favorites have been deleted"
    }), 201


#delete a favorite
@api.route('/favorites/<int:favorite>/', methods=['DELETE'])
def delete_favorite(favorite):
    favorites = Favorites.query.filter(Favorites.id == favorite).first()
    if favorites is None:
        return jsonify({
            "msg":"No favorites were found"
            }), 404

    db.session.delete(favorites)
    db.session.commit()
    
    return jsonify({
        "msg":"Favorite delete successfully" 
    }), 201


#Get all films
@api.route('/films/', methods=['GET'])
def get_films():
    films = Films.query.all()
    all_films = [film.serialize() for film in films]
    if len(all_films) > 0:
        return jsonify({
            "all films": all_films
        })
    else:
        return jsonify({
            "message": "There are no films"
        })


#Get a film

@api.route('/films/<int:film>', methods=['GET'])
def film(film):
    films = Films.query.filter(Films.id == film).first()
    if not films is None:

        return jsonify({
                "film":films.serialize()
            }), 201

    return jsonify({
        "film":"Film not found"
    }), 404

#post a film
@api.route('/films', methods=['POST'])
def post_film():
    title = request.json.get("title")
    director = request.json.get("director")
    producer = request.json.get("producer")
    release_date = request.json.get("release_date")
    episode_id = request.json.get("episode_id")
    post_film = Films(title = title, director = director, producer = producer, release_date = release_date, episode_id = episode_id)
    films = Films.query.filter(Films.title == title and Films.director == director and Films.producer == producer and Films.release_date == release_date and Films.episode_id == episode_id ).first()
    if not films is None:
        return jsonify({
            "msg":"Film already exist"
        }), 404
    db.session.add(post_film)
    db.session.commit()
    return jsonify({
        "msg":"Film created successfully"
    }), 201


#update films
@api.route('/films/<int:film_id>', methods=['PUT'])
def update_film(film_id):
    title = request.json.get("title")
    director = request.json.get("director")
    producer = request.json.get("producer")
    release_date = request.json.get("release_date")
    episode_id = request.json.get("episode_id")
    films = Films.query.filter(Films.id == film_id).all()
    if len(films) == 0:
        return jsonify({
            "msg":"Film not avaliable to update"
        }), 404

    new_film = films[0]
    new_film.title = title
    new_film.director = director
    new_film.producer = producer
    new_film.release_date = release_date
    new_film.episode_id = episode_id

    db.session.add(new_film)
    db.session.commit()
    return jsonify({
        "success":"Film update successfully"
    }), 201

#delete all films

@api.route('/films', methods=['DELETE'])
def delete_all_films():
    films = Films.query.filter(Films.__tablename__ == "films").all()

    if len(films) == 0:

        return jsonify({
            "msg":"There are no films to delete"
        }), 404

    for i in range(len(films)):
        db.session.delete(films[i])
        db.session.commit()

    return jsonify({
        "msg":"all films have been deleted"
    }), 201


#delete a film
@api.route('/films/<int:film>', methods=['DELETE'])
def delete_film(film):
    films = Films.query.filter(Films.id == film).first()
    if films is None:
        return jsonify({
            "msg":"Film not found"
        }), 404
    db.session.delete(films)
    db.session.commit()
    return jsonify({
        "msg":"Film deleted successfully"
    }), 201


#get all people


@api.route('/people', methods=["GET"])
def get_all_people():
    people = People.query.filter(People.__tablename__ == "people").all()
    all_people = []
    for i in range(len(people)):
        all_people.append(people[i].serialize())
    if len(all_people) > 0:
        return jsonify({
            "All people":all_people
        }), 200
    return jsonify({
        "msg":"There are no people"
    })


# get people
@api.route('/people/<int:peop>', methods=['GET'])
def get_people(peop):
    people = People.query.filter(People.id == peop).first()
    if not people is None:
        return jsonify({
                "people":people.serialize()
            }), 201
    return jsonify({
        "msg":"people not found"
    }), 404


# post new people

@api.route('/people', methods=['POST'])
def post_people():
    name = request.json.get("name")
    skin_color = request.json.get("skin_color")
    height = request.json.get("height")
    eyes_color = request.json.get("eyes_color")
    gender = request.json.get("gender")
    birth_year = request.json.get("birth_year")
    post_people = People(name = name, gender = gender, height = height, skin_color = skin_color, eyes_color = eyes_color, birth_year = birth_year)
    people = People.query.filter(People.name == name and People.gender == gender and People.height == height and People.skin_color == skin_color and People.eyes_color == eyes_color and People.birth_year == birth_year).first()
    if not people is None:
        return jsonify({
            "msg":"People already exist"
        }), 404
    db.session.add(post_people)
    db.session.commit()
    return jsonify({
        "msg":"People created successfully"
    }), 201

# update people

@api.route('/people/<int:people_id>', methods=['PUT'])
def update_people(people_id):
    name = request.json.get("name")
    eyes_color = request.json.get("eyes_color")
    height = request.json.get("height")
    skin_color = request.json.get("skin_color")
    gender = request.json.get("gender")
    birth_year = request.json.get("birth_year")
    people = People.query.filter(People.id == people_id).all()
    if len(people) == 0:
        return jsonify({
            "msg":"People not avaliable to update"
        }), 404
    new_people = people[0]
    new_people.name = name
    new_people.gender = gender
    new_people.height = height
    new_people.skin_color = skin_color
    new_people.eyes_color = eyes_color
    new_people.birth_year = birth_year
    db.session.add(new_people)
    db.session.commit()
    return jsonify({
        "success":"People updated successfully"
    }), 201

# Delete all people

@api.route('/people', methods=['DELETE'])
def delete_all_people():
    people = People.query.filter(People.__tablename__ == "people").all()
    if len(people) == 0:
        return jsonify({
            "msg":"there are no people to delete"
        }), 404
    for i in range(len(people)):
        db.session.delete(people[i])
        db.session.commit()
    return jsonify({
        "msg":"all people have been deleted"
    }), 201

# delete a person(people)

@api.route('/people/<int:peop>', methods=['DELETE'])
def delete_people(peop):
    people = People.query.filter(People.id == peop).first()
    if people is None:
        return jsonify({
            "msg":"There are no people to delete"
        }), 404
    db.session.delete(people)
    db.session.commit()
    return jsonify({
        "msg":"people deleted successfully"
    }), 201

# Get all planets

@api.route('/planets', methods=['GET'])
def planets():
    planets = Planets.query.filter(Planets.__tablename__ == "planets").all()
    all_planets = []
    for i in range(len(planets)):
        all_planets.append(planets[i].serialize())
    if len(all_planets) > 0:
        return jsonify({
            "All planets":all_planets
        }), 200
    return jsonify({
        "msg":"No planets were found"
    })

# get a planet

@api.route('/planets/<int:planet>', methods=['GET'])
def planet(planet):
    planets = Planets.query.filter(Planets.id == planet).first()
    if not planets is None:
        return jsonify({
            "planet":planets.serialize()
        }), 200
    return jsonify({
        "msg":"planet not found"
    })

# Post new planet

@api.route('/planets', methods=['POST'])
def post_planet():
    name = request.json.get("name")
    diameter = request.json.get("diameter")
    gravity = request.json.get("gravity")
    population = request.json.get("population")
    terrain = request.json.get("terrain")
    climate = request.json.get("climate")
    post_planet = Planets(name = name, diameter = diameter, gravity = gravity, population = population, terrain = terrain, climate = climate)
    planets = Planets.query.filter(Planets.name == name and Planets.diameter == diameter and Planets.population == population and Planets.terrain == terrain and Planets.climate == climate).first()
    if not planets is None:
        return jsonify({
            "msg":"Planet already exist"
        }), 404
    db.session.add(post_planet)
    db.session.commit()
    return jsonify({
        "msg":"Planet created successfully"
    }), 201

# update planet

@api.route('/planets/<int:planet_id>', methods=['PUT'])
def update_planet(planet_id):
    name = request.json.get("name")
    diameter = request.json.get("diameter")
    gravity = request.json.get("gravity")
    population = request.json.get("population")
    terrain = request.json.get("terrain")
    climate = request.json.get("climate")
    planets = Planets.query.filter(Planets.id == planet_id).all()
    if len(planets) == 0:
        return jsonify({
            "msg":"Planet not found"
        }), 404

    new_planet = planets[0]
    new_planet.name = name
    new_planet.population = population
    new_planet.gravity = gravity
    new_planet.terrain = terrain
    new_planet.diameter = diameter
    new_planet.climate = climate
    db.session.add(new_planet)
    db.session.commit()
    return jsonify({
        "success":"Planet updated successfully"
    }), 201



# delete planet

@api.route('/planets/<int:planet>', methods=['DELETE'])
def delete_planet(planet):
    planets = Planets.query.filter(Planets.id == planet).first()
    if planets is None:
        return jsonify({
            "msg":"Planet not found"
        }), 404

    db.session.delete(planets)
    db.session.commit()
    return jsonify({
        "msg":"planet deleted successfully"
    }), 201

# delete all planets

@api.route('/planets', methods=['DELETE'])
def delete_all_planets():
    planets = Planets.query.filter(Planets.__tablename__ == "planets").all()
    if len(planets) == 0:
        return jsonify({
            "msg":"there are no planets to delete"
        }), 404
    for i in range(len(planets)):
        db.session.delete(planets[i])
        db.session.commit()
    return jsonify({
        "msg":"all planets have been deleted"
    }), 201


# get all species

@api.route('/species')
def species():
    species = Species.query.filter(Species.__tablename__ == "species").all()
    all_species = []
    for i in range(len(species)):
        all_species.append(species[i].serialize())
    if len(all_species) > 0:
        return jsonify({
            "All species":all_species
        }), 200
    return jsonify({
        "msg":"No species were found"
    })


# get a specie

@api.route('/species/<int:specie>')
def specie(specie):
    species = Species.query.filter(Species.id == specie).first()
    if not species is None:
        return jsonify({
            "specie":species.serialize()
        }), 200
    return jsonify({
        "msg":"specie not found"
    })

# post new specie

@api.route('/species', methods=['POST'])
def post_specie():
    classification = request.json.get("classification")
    skin_color = request.json.get("skin_color")
    languaje = request.json.get("languaje")
    eye_color = request.json.get("eye_color")
    average_lifespan = request.json.get("average_lifespan")
    designation = request.json.get("designation")
    post_specie = Species(classification = classification, designation = designation, languaje = languaje, skin_color = skin_color, eye_color = eye_color, average_lifespan = average_lifespan)
    species = Species.query.filter(Species.classification == classification and Species.designation == designation and Species.languaje == languaje and Species.skin_color == skin_color and Species.eye_color == eye_color and Species.average_lifespan == average_lifespan).first()
    if not species is None:
        return jsonify({
            "msg":"Specie already exist"
        }), 404
    db.session.add(post_specie)
    db.session.commit()
    return jsonify({
        "msg":"Specie created successfully"
    })

# update specie

@api.route('/species/<int:specie_id>', methods=['PUT'])
def update_specie(specie_id):
    classification = request.json.get("classification")
    designation = request.json.get("designation")
    languaje = request.json.get("languaje")
    skin_color = request.json.get("skin_color")
    eye_color = request.json.get("eye_color")
    average_lifespan = request.json.get("average_lifespan")
    species = Species.query.filter(Species.id == specie_id).all()
    if len(species) == 0:
        return jsonify({
            "msg":"Specie not avaliable to update"
        }), 404
    new_specie = species[0]
    new_specie.classification = classification
    new_specie.designation = designation
    new_specie.languaje = languaje
    new_specie.skin_color = skin_color
    new_specie.eye_color = eye_color
    new_specie.average_lifespan = average_lifespan
    db.session.add(new_specie)
    db.session.commit()
    return jsonify({
        "success":"Specie updated successfully"
    })


# delete all species

@api.route('/species', methods=['DELETE'])
def delete_all_species():
    species = Species.query.filter(Species.__tablename__ == "species").all()
    if len(species) == 0:
        return jsonify({
            "msg":"There are no species to delete"
        }), 404

    for i in range(len(species)):
        db.session.delete(species[i])
        db.session.commit()
    return jsonify({
        "msg":"all species have been deleted"
    }), 201

# delete a specie

@api.route('/species/<int:specie>', methods=['DELETE'])
def delete_specie(specie):
    species = Species.query.filter(Species.id == specie).first()
    if species is None:
        return jsonify({
            "msg":"Not found"
        }), 404
    db.session.delete(species)
    db.session.commit()
    return jsonify({
        "msg":"specie deleted successfully"
    }), 201

#get all starships

@api.route('/starships')
def starships():
    starships = Starships.query.filter(Starships.__tablename__ == "starships").all()
    all_starships = []
    for i in range(len(starships)):
        all_starships.append(starships[i].serialize())
    if len(all_starships) > 0:
        return jsonify({
            "All starships":all_starships
        }), 200
    return jsonify({
        "msg":"No starships were found"
    })

# Get a staship

@api.route('/starships/<int:starship>')
def starship(starship):
    starships = Starships.query.filter(Starships.id == starship).first()
    if not starships is None:
        return jsonify({
            "starship":starships.serialize()
        }), 200 
    return jsonify({
        "msg":"starship not found"
    })

# post new starship

@api.route('/starships', methods=['POST'])
def post_starship():
    manufacturer = request.json.get("manufacturer")
    lenght = request.json.get("lenght")
    cargo_capacity = request.json.get("cargo_capacity")
    model = request.json.get("model")
    max_atmosphering_speed = request.json.get("max_atmosphering_speed")
    consumables = request.json.get("consumables")
    post_starship = Starships(model = model, manufacturer = manufacturer, lenght = lenght, cargo_capacity = cargo_capacity, consumables = consumables, max_atmosphering_speed = max_atmosphering_speed)
    starships = Starships.query.filter(Starships.model == model and Starships.manufacturer == manufacturer and Starships.lenght == lenght and Starships.cargo_capacity == cargo_capacity and Starships.consumables == consumables and Starships.max_atmosphering_speed == max_atmosphering_speed).first()
    if not starships is None:
        return jsonify({
            "msg":"Starship already exist"
        }), 404
    db.session.add(post_starship)
    db.session.commit()
    return jsonify({
        "msg":"Starship created successfully"
    })

# Update starships

@api.route('/starships/<int:starship_id>', methods=['PUT'])
def update_starship(starship_id):
    model = request.json.get("model")
    manufacturer = request.json.get("manufacturer")
    lenght = request.json.get("lenght")
    cargo_capacity = request.json.get("cargo_capacity")
    consumables = request.json.get("consumables")
    max_atmosphering_speed = request.json.get("max_atmosphering_speed")
    starships = Starships.query.filter(Starships.id == starship_id).all()
    if len(starships) == 0:
        return jsonify({
            "msg":"Starship not found"
        }), 404
    new_starship = starships[0]
    new_starship.model = model
    new_starship.manufacturer = manufacturer
    new_starship.lenght = lenght
    new_starship.cargo_capacity = cargo_capacity
    new_starship.consumables = consumables
    new_starship.max_atmosphering_speed = max_atmosphering_speed
    db.session.add(new_starship)
    db.session.commit()

    return jsonify({
        "success":"Starship updated successfully"
    }), 201


#Delete all starships

@api.route('/starships', methods=['DELETE'])
def delete_all_starships():
    starships = Starships.query.filter(Starships.__tablename__ == "starships").all()

    if len(starships) == 0:

        return jsonify({
            "msg":"There are no starships to delete"
        }), 404

    for i in range(len(starships)):
        db.session.delete(starships[i])
        db.session.commit()

    return jsonify({
        "msg":"all starships have been deleted"
    }), 201

# delete a starship

@api.route('/starships/<int:starship>', methods=['DELETE'])
def delte_starship(starship):
    starships = Starships.query.filter(Starships.id == starship).first()
    if starships is None:
        return jsonify({
            "msg":"Starship not found"
        }), 404
    db.session.delete(starships)
    db.session.commit()
    return jsonify({
        "msg":"starship deleted successfully"
    }), 201



# Get all vehicles

@api.route('/vehicles')
def vehicles():
    vehicles = Vehicles.query.filter(Vehicles.__tablename__ == "vehicles").all()
    all_vehicles = []
    for i in range(len(vehicles)):
        all_vehicles.append(vehicles[i].serialize())
    if len(all_vehicles) > 0:
        return jsonify({
            "All vehicles":all_vehicles
        }), 200
    return jsonify({
        "msg":"Vehicle not found"
    })


# get a vehicle

@api.route('/vehicles/<int:vehicle>')
def vehicle(vehicle):
    vehicles = Vehicles.query.filter(Vehicles.id == vehicle).first()

    if not vehicles is None:

        return jsonify({
            "vehicle":vehicles.serialize()
        }), 200
    return jsonify({
        "msg":"vehicle not found"
    })

# POST NEW VEHICLE

@api.route('/vehicles', methods=['POST'])
def post_vehicle():
    model = request.json.get("model")
    lenght = request.json.get("lenght")
    cargo_capacity = request.json.get("cargo_capacity")
    consumables = request.json.get("consumables")
    manufacturer = request.json.get("manufacturer")
    post_vehicle = Vehicles(model = model, manufacturer = manufacturer, lenght = lenght, cargo_capacity = cargo_capacity, consumables = consumables)
    vehicles = Vehicles.query.filter(Vehicles.model == model and Vehicles.manufacturer == manufacturer and Vehicles.lenght == lenght and Vehicles.cargo_capacity == cargo_capacity).first()
    if not vehicles is None:
        return jsonify({
            "msg":"Vehicle already exist"
        }), 404
    db.session.add(post_vehicle)
    db.session.commit()

    return jsonify({
        "msg":"Vehicle created successfully"
    }), 201

# update vehicle

@api.route('/vehicles/<int:vehicle_id>', methods=['PUT'])
def update_vehicle(vehicle_id):
    model = request.json.get("model")
    manufacturer = request.json.get("manufacturer")
    lenght = request.json.get("lenght")
    cargo_capacity = request.json.get("cargo_capacity")
    consumables = request.json.get("consumables")
    vehicles = Vehicles.query.filter(Vehicles.id == vehicle_id).all()
    if len(vehicles) == 0:
        return jsonify({
            "msg":"Vehicle not found"
        }), 404

    new_vehicle = vehicles[0]
    new_vehicle.model = model
    new_vehicle.manufacturer = manufacturer
    new_vehicle.lenght = lenght
    new_vehicle.cargo_capacity = cargo_capacity
    new_vehicle.consumables = consumables
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify({
        "success":"Vehicle updated successfully"
    }), 201

# DELETE ALL VEHICLES

@api.route('/vehicles', methods=['DELETE'])
def delete_all_vehicles():
    vehicles = Vehicles.query.filter(Vehicles.__tablename__ == "vehicles").all()
    if len(vehicles) == 0:
        return jsonify({
            "msg":"There are no vehicles to delete"
        }), 404
    for i in range(len(vehicles)):
        db.session.delete(vehicles[i])
        db.session.commit()

    return jsonify({
        "msg":"all vehicles havd been deleted"
    }), 201

# DELETE VEHICLE

@api.route('/vehicles/<int:vehicle>', methods=['DELETE'])
def delete_vehicle(vehicle):
    vehicles = Vehicles.query.filter(Vehicles.id == vehicle).first()
    if vehicles is None:
        return jsonify({
            "msg":"There are no vehicles to delete"
        }), 404
    db.session.delete(vehicles)
    db.session.commit()
    return jsonify({
        "msg":"vehicle deleted successfully"
    }), 201