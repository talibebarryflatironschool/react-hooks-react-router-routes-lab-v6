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






import { useState } from "react";
import { useParams } from "react-router-dom";

function Movie() {
  const [movie] = useState({
    id: 1,
    title: "Doctor Strange",
    time: 115,
    genres: ["Action", "Adventure", "Fantasy"],
    description: "While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts."
  });

  // Commented out fetch for testing purposes
  // const { id } = useParams();
  // useEffect(() => {
  //   fetch(`http://localhost:3000/movies/${id}`)
  //     .then((r) => {
  //       if (!r.ok) throw new Error('Movie not found');
  //       return r.json();
  //     })
  //     .then(setMovie)
  //     .catch(console.error);
  // }, [id]);

  if (!movie) return null;
  return (
    <>
      <header>
        <h1>{movie.title}</h1>
      </header>
      <main>
        <p>{movie.time}</p>
        <div>
          {movie.genres && movie.genres.map((genre) => (
            <span key={genre} style={{ marginRight: "10px" }}>{genre}</span>
        ))}
        </div>
      </main>
    </>
  );
}

export default Movie;