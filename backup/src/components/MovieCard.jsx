import "./MovieCard.css";

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <button
          className={isFavorite ? "remove" : "favorite"}
          onClick={() => onToggleFavorite(movie)}
        >
          {isFavorite ? "Remove ❤️" : "Favorite 💙"}
        </button>
      </div>
    </div>
  );
}
