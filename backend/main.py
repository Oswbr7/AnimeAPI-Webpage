from flask import request, jsonify
from config import app, db
from models import Anime

@app.route("/animes", methods = ["GET"])
def get_animes():
    animes = Anime.query.all()
    json_animes = list(map(lambda x: x.to_json(), animes))
    return jsonify({"animes": json_animes})

@app.route("/create_anime", methods = ["POST"])
def create_anime():
    name = request.json.get("name")
    author = request.json.get("author")
    description = request.json.get("description")
    released = request.json.get("released")
    is_finished = request.json.get("is_finished")
    volumes = request.json.get("volumes")
    image_url = request.json.get("image_url")

    if not name or not author or not volumes:
        return (
            jsonify({"message": "You must include the name, author and volumes"}), 400
        )
    
    new_anime = Anime(name = name, author = author, description = description, released = released, is_finished = is_finished, volumes = volumes, image_url = image_url)
    try:
        db.session.add(new_anime)
        db.session.commit()
    except Exception as e:
        return jsonify ({"message": str(e)}), 400

    return jsonify({"message": "Anime created"}), 201

@app.route("/update_anime/<int:anime_id>", methods = ["PATCH"])
def update_anime(anime_id):
    anime = Anime.query.get(anime_id)

    if not anime:
        return jsonify({"message": "Anime not found"})
    
    data = request.json
    anime.name = data.get("name", anime.name)
    anime.author = data.get("author", anime.author)
    anime.description = data.get("description", anime.description)
    anime.released = data.get("released", anime.released)
    anime.is_finished = data.get("is_finished", anime.is_finished)
    anime.volumes = data.get("volumes", anime.volumes)
    anime.image_url = data.get("image_url", anime.image_url)

    db.session.commit()

    return jsonify({"message": "Anime updated"}), 200

@app.route("/delete_anime/<int:anime_id>", methods = ["DELETE"])
def delete_anime(anime_id):
    anime = Anime.query.get(anime_id)

    if not anime:
        return jsonify({"message": "Anime not found"})
    
    db.session.delete(anime)
    db.session.commit()

    return jsonify({"message": "Anime deleted"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)