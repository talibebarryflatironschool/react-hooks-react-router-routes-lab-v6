// import { useEffect, useState } from "react";

// function Home() {
//   return (
//     <>
//       <header>
//         {/* What component should go here? */}
//       </header>
//       <main>
//         {/* Info goes here! */}
//       </main>
//     </>
//   );
// };

// export default Home;








import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies] = useState([
    {
      id: 1,
      title: "Doctor Strange",
      time: 115,
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      id: 2,
      title: "Trolls",
      time: 92,
      genres: ["Animation", "Adventure", "Comedy"]
    },
    {
      id: 3,
      title: "Jack Reacher: Never Go Back",
      time: 118,
      genres: ["Action", "Adventure", "Crime"]
    }
  ]);

  return (
    <>
      <header>
        <h1>Home Page</h1>
      </header>
      <main>
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id}
            id={movie.id} 
            title={movie.title}
          />
        ))}
      </main>
    </>
  );
}

export default Home;