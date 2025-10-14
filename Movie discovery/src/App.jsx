import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import "./App.css";

const API_KEY = "YOUR_OMDB_API_KEY"; // get one free from http://www.omdbapi.com/apikey.aspx

export default function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const searchMovies = async (query) => {
    if (!query) return;
    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      setMovies(res.data.Search || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const toggleFavorite = (movie) => {
    const updated = favorites.find((f) => f.imdbID === movie.imdbID)
      ? favorites.filter((f) => f.imdbID !== movie.imdbID)
      : [...favorites, movie];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="app-container">
      <h1>🎬 Movie Explorer</h1>
      <SearchBar onSearch={searchMovies} />
      <div className="movie-grid">
        {movies.map((m) => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            isFavorite={favorites.some((f) => f.imdbID === m.imdbID)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {favorites.length > 0 && (
        <div className="favorites-section">
          <h2>❤️ Your Favorites</h2>
          <div className="movie-grid">
            {favorites.map((m) => (
              <MovieCard
                key={m.imdbID}
                movie={m}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
