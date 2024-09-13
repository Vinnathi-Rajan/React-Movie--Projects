import React, { useState, useEffect } from 'react';

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    duration: '',
    release_date: '',
    director: '',
    rating: ''
  });

  useEffect(() => {
    fetch('/movies')
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        setMovies([...movies, data]);
        setFormData({
          title: '',
          genre: '',
          duration: '',
          release_date: '',
          director: '',
          rating: ''
        });
      });
  };

  const handleUpdate = (movie) => {
    // Code to handle the update functionality can be implemented here
  };

  const handleDelete = (id) => {
    fetch(`/movies/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setMovies(movies.filter(movie => movie.movie_id !== id));
      });
  };

  return (
    <div>
      <h2>Manage Movies</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} />
        <input type="number" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} />
        <input type="date" name="release_date" placeholder="Release Date" value={formData.release_date} onChange={handleChange} />
        <input type="text" name="director" placeholder="Director" value={formData.director} onChange={handleChange} />
        <input type="number" step="0.1" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} />
        <button type="submit">Add Movie</button>
      </form>
      <h3>Existing Movies</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Duration</th>
            <th>Release Date</th>
            <th>Director</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.movie_id}>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.duration}</td>
              <td>{movie.release_date}</td>
              <td>{movie.director}</td>
              <td>{movie.rating}</td>
              <td>
                <button onClick={() => handleUpdate(movie)}>Update</button>
                <button onClick={() => handleDelete(movie.movie_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMovies;
