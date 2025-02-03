// import "@testing-library/jest-dom";
// import { RouterProvider, createMemoryRouter, MemoryRouter} from "react-router-dom"
// import { render, screen } from "@testing-library/react";
// import routes from "../routes";



// test('renders the Home component on route "/"', () => {
//   const router = createMemoryRouter(routes)
//   render(
//     <RouterProvider router={router}/>
// );
//   expect(screen.getByText(/Home Page/)).toBeInTheDocument();
// });

// test('renders the Actors component on route "/actors"', () => {
//     const router = createMemoryRouter(routes, {
//         initialEntries: ['/actors']
//     })
//   render(
//     <RouterProvider router={router}/>
// );
//   expect(screen.getByText(/Actors Page/)).toBeInTheDocument();
// });

// test('renders the Directors component on route "/directors"', () => {
//     const router = createMemoryRouter(routes, {
//         initialEntries: ['/directors']
//     })
//   render(
//       <RouterProvider router={router}/>
//   );
//   expect(screen.queryByText(/Directors Page/)).toBeInTheDocument();
// });

// test('renders the Movie component on route "/movie/:id"', async () => {
//     const id = 1
//     const router = createMemoryRouter(routes, {
//         initialEntries: [`/movie/${id}`]
//     })
//   render(
//     <RouterProvider router={router}/>
// );
//   expect(await screen.findByText(/Doctor Strange/)).toBeInTheDocument();
// });

// test("renders an error page when given a bad URL", () =>{
//   const router = createMemoryRouter(routes, {
//       initialEntries: ["/bad-route"]
//   })
//   render(
//       <RouterProvider router={router} />
//   )
//   expect(screen.getByText(/Oops! Looks like something went wrong./)).toBeInTheDocument()
// })



import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import routes from "../routes";
import { vi } from "vitest";

const id = 1;
const router = createMemoryRouter(routes, {
    initialEntries: [`/movie/${id}`],
    initialIndex: 0
});

// Mock fetch for testing
beforeAll(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes("/movies/1")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          id: 1,
          title: "Doctor Strange",
          time: 115,
          genres: ["Action", "Adventure", "Fantasy"],
        }),
      });
    }
    return Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: "Movie not found" })
    });
  });
});

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");
  render(<RouterProvider router={router}/>);
  expect(errorSpy).not.toHaveBeenCalled();
  errorSpy.mockRestore();
});

test("renders movie's title in an h1", async () => {
  render(<RouterProvider router={router} />);
  const h1 = await screen.findByTestId("movie-title");
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("renders movie's time within a p tag", async () => {
  render(<RouterProvider router={router} />);
  const p = await screen.findByTestId("movie-time");
  expect(p).toBeInTheDocument();
  expect(p.tagName).toBe("P");
});

test("renders a span for each genre", async () => {
  render(<RouterProvider router={router} />);
  const genres = ["Action", "Adventure", "Fantasy"];
  const spans = await screen.findAllByText((content, element) => 
    element.tagName.toLowerCase() === "span" && genres.includes(content)
  );
  expect(spans.length).toBe(genres.length);
});

test("renders the <NavBar /> component", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: [`/movie/1`]
  });
  render(<RouterProvider router={router}/>);
  expect(await screen.findByRole("navigation")).toBeInTheDocument();
});

// Clean up fetch mock after all tests
afterAll(() => {
  global.fetch.mockRestore();
});
