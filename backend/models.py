from config import db

class Anime(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(60), unique = False, nullable = False)
    author = db.Column(db.String(40), unique = False, nullable = False)
    description = db.Column(db.String(100), unique = False, nullable = True)
    released = db.Column(db.String(60), unique = False, nullable = True)
    is_finished = db.Column(db.Boolean, unique = False, nullable = True)
    volumes = db.Column(db.Integer, unique = False, nullable = False)
    image_url = db.Column(db.String(200), unique = False, nullable = True)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "author": self.author,
            "description": self.description,
            "released": self.released,
            "is_finished": self.is_finished,
            "volumes": self.volumes,
            "image_url": self.image_url
        }