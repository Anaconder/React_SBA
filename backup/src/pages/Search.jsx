import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

function Search() {
  const [query, setQuery] = useState("Avengers");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=ed86d8ec`);
      const data = await res.json();
      if (data.Search) setMovies(data.Search);
      else setMovies([]);
    }
    fetchMovies();
  }, [query]);

  return (
    <div className="page">
      <h2>Search Movies</h2>
      <SearchBar onSearch={setQuery} />
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;
