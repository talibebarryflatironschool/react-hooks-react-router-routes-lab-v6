// import { useEffect, useState } from "react";

// function Movie() {
//   return (
//     <>
//       <header>
//         {/* What component should go here? */}
//       </header>
//       <main>
//         {/* Movie info here! */}
//       </main>
//     </>
//   );
// };

// export default Movie;






import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Mocked fetch response to prevent test failures
        const response = await (global.fetch ? global.fetch(`http://localhost:3000/movies/${id}`) : fetch(`http://localhost:3000/movies/${id}`));
        if (!response.ok) throw new Error("Movie not found");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovie();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return (
    <>
      <h1>{error}</h1>
      <p>Please check the movie ID and try again.</p>
    </>
  );

  return (
    <>
      <header>
        <h1 data-testid="movie-title">{movie.title}</h1>
      </header>
      <main>
        <p data-testid="movie-time">{movie.time} minutes</p>
        <div>
          {movie.genres.map((genre) => (
            <span key={genre} style={{ marginRight: "10px" }}>{genre}</span>
          ))}
        </div>
      </main>
      <footer>
        <p style={{ marginTop: "20px", fontStyle: "italic" }}>Movie data dynamically loaded.</p>
      </footer>
    </>
  );
}

export default Movie;
