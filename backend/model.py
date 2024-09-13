from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Movie(db.Model):
    movie_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(100))
    duration = db.Column(db.Integer)
    release_date = db.Column(db.Date)
    director = db.Column(db.String(255))
    rating = db.Column(db.Float)

class Screening(db.Model):
    screening_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.movie_id'))
    screen_id = db.Column(db.Integer)
    screening_type = db.Column(db.String(50))
    screening_time = db.Column(db.DateTime)

class Selling(db.Model):
    sale_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    screening_id = db.Column(db.Integer, db.ForeignKey('screening.screening_id'))
    customer_id = db.Column(db.Integer)
    sale_date = db.Column(db.DateTime)
    total_amount = db.Column(db.Numeric(10, 2))
    ticket_quantity = db.Column(db.Integer)

class SeatingBooking(db.Model):
    booking_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    screening_id = db.Column(db.Integer, db.ForeignKey('screening.screening_id'))
    seat_id = db.Column(db.Integer)
    customer_id = db.Column(db.Integer)
    booking_date = db.Column(db.DateTime)
    booking_status = db.Column(db.String(50))
