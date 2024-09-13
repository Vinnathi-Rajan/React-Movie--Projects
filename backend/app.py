from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from models import db, Movie, Screening, Selling, SeatingBooking

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/theatre'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/movies', methods=['GET', 'POST'])
def manage_movies():
    if request.method == 'POST':
        data = request.json
        new_movie = Movie(
            title=data['title'],
            genre=data['genre'],
            duration=data['duration'],
            release_date=datetime.strptime(data['release_date'], '%Y-%m-%d'),
            director=data['director'],
            rating=data['rating']
        )
        db.session.add(new_movie)
        db.session.commit()
        return jsonify({'message': 'Movie added successfully!'}), 201
    
    movies = Movie.query.all()
    movies_list = [{
        'movie_id': movie.movie_id,
        'title': movie.title,
        'genre': movie.genre,
        'duration': movie.duration,
        'release_date': movie.release_date.strftime('%Y-%m-%d'),
        'director': movie.director,
        'rating': movie.rating
    } for movie in movies]
    return jsonify(movies_list), 200

# Add similar routes for managing screenings, selling, and seating bookings

if __name__ == '__main__':
    app.run(debug=True)
