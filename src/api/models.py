from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class People(db.Model):
    __tablename__ = "people"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable = False)
    gender = db.Column(db.String(50), nullable = False)
    height = db.Column(db.Integer, nullable = False)
    skin_color = db.Column(db.String(50), nullable = False)
    eyes_color = db.Column(db.String(50), nullable = False)
    birth_year = db.Column(db.String(50), nullable = False)
    def __repr__(self):
        return f'<People {self.id}>'
    def serialize(self):
        return {
            "id":self.id,
            "name": self.name,
            "gender": self.gender,
            "height": self.height,
            "skin_color": self.skin_color,
            "eyes_color": self.eyes_color,
            "birth_year": self.birth_year,
        }



class Planets(db.Model):
    __tablename__= "planets"
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(50), nullable = False)
    diameter = db.Column(db.Integer, nullable = False)
    gravity = db.Column(db.String(50), nullable = False)
    population = db.Column(db.Integer, nullable = False)
    terrain = db.Column(db.String(50), nullable = False)
    climate = db.Column(db.String(50), nullable = False)
    def __repr__(self):
        return f'<Planets {self.id}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "diameter": self.diameter,
            "gravity": self.gravity,
            "population": self.population,
            "terrain": self.terrain,
            "climate": self.climate,
            }


class Vehicles(db.Model):
    __tablename__= "vehicles"
    id = db.Column(db.Integer, primary_key = True)
    model = db.Column(db.String(50), nullable = False)
    manufacturer = db.Column(db.String(100), nullable = False) 
    lenght = db.Column(db.Integer, nullable = False)
    cargo_capacity = db.Column(db.Integer, nullable = False)
    consumables = db.Column(db.String(100), nullable = False)
    def __repr__(self):
        return f'<Vehicles {self.id}>'
    def serialize(self):
        return{
            "id":self.id,
            "model": self.model,
            "manufacturer": self.manufacturer,
            "lenght": self.lenght,
            "cargo_capacity": self.cargo_capacity,
            "consumables": self.consumables,
        }

class Starships(db.Model):
    __tablename__="starships"
    id = db.Column(db.Integer, primary_key = True)
    model = db.Column(db.String(50), nullable = False)
    manufacturer = db.Column(db.String(100), nullable = False)
    lenght = db.Column(db.Integer, nullable = False)
    cargo_capacity = db.Column(db.Integer, nullable = False)
    consumables = db.Column(db.String(100), nullable = False)
    max_atmosphering_speed = db.Column(db.Integer, nullable = False)
    def __repr__(self):
        return f'<Starships {self.id}>'
    def serialize(self):
        return{
            "id":self.id,
            "model": self.model,
            "manufacturer": self.manufacturer,
            "lenght": self.lenght,
            "cargo_capacity": self.cargo_capacity,
            "consumables": self.consumables,
            "max_atmosphering_speed": self.max_atmosphering_speed,
        }

class Films(db.Model):
    __tablename__="films"
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50), nullable = False)
    director = db.Column(db.String(50), nullable = False)
    producer = db.Column(db.String(50), nullable = False)
    release_date = db.Column(db.String(50), nullable = False)
    episode_id = db.Column(db.Integer, nullable = False)
    def __repr__(self):
        return f'<Films {self.id}>'
    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "director": self.director,
            "producer": self.producer,
            "release_date": self.release_date,
            "episode_id": self.episode_id,
            }

class Species(db.Model):
    __tablename__="species"
    id = db.Column(db.Integer, primary_key = True)
    classification = db.Column(db.String(50), nullable = False)
    designation = db.Column(db.String(100), nullable = False)
    languaje = db.Column(db.String(100), nullable = False)
    skin_color = db.Column(db.String(100), nullable = False)
    eye_color = db.Column(db.String(50), nullable = False)
    average_lifespan = db.Column(db.String(100), nullable = False)
    def __repr__(self):
        return f'<Species{self.id}>'
    def serialize(self):
        return{
           "id":self.id,
            "classification": self.classification,
            "designation": self.designation,
            "languaje": self.languaje,
            "skin_color": self.skin_color,
            "eye_color": self.eye_color,
            "average_lifespan": self.average_lifespan,  
        }

class Favorites(db.Model):
    __tablename__="favorites"
    id = db.Column(db.Integer, primary_key = True)
    favorite_type = db.Column(db.String(50), nullable = False)
    element_id = db.Column(db.Integer, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)
    def __repr__(self):
        return f'<Favorites {self.id}>'
    def serialize(self):
        if self.favorite_type == "films":
            element = Films.query.get(self.element_id)
        elif self.favorite_type == "people": 
            element = People.query.get(self.element_id)
        elif self.favorite_type == "planets": 
            element = Planets.query.get(self.element_id)
        elif self.favorite_type == "species": 
            element = Species.query.get(self.element_id)
        elif self.favorite_type == "starships": 
            element = Starships.query.get(self.element_id)
        elif self.favorite_type == "vehicles": 
            element = Vehicles.query.get(self.element_id)
        else:
            element = None

        if element:
            return {
                "id": self.id,
                "favorite_type": self.favorite_type,
                "user": self.user.email,
                "user_id": self.user.id,
                "element": element.serialize()
            }
        else:
            return {
                "id": self.id,
                "favorite_type": self.favorite_type,
                "user": self.user.email,
                "user_id": self.user.id,
                "element": None
            }