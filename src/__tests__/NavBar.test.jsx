// import "@testing-library/jest-dom";
// import React from "react";
// import { fireEvent, render, screen } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import NavBar from "../components/NavBar";

// let container;

// beforeEach(() => {
//   container = render(
//     <BrowserRouter>
//       <NavBar />
//     </BrowserRouter>
//   ).container;
// });

// test('wraps content in a div with "navbar" class', () => {
//   expect(container.querySelector(".navbar")).toBeInTheDocument();
// });

// test("renders a Home <NavLink>", async () => {
//   const a = screen.queryByText(/Home/);

//   expect(a).toBeInTheDocument();
//   expect(a.tagName).toBe("A");
//   expect(a.href).toContain("/");

//   fireEvent.click(a, { button: 0 });

//   expect(a.classList).toContain("active");
// });

// test("renders a Actors <NavLink>", async () => {
//   const a = screen.queryByText(/Actors/);

//   expect(a).toBeInTheDocument();
//   expect(a.tagName).toBe("A");
//   expect(a.href).toContain("/");

//   fireEvent.click(a, { button: 0 });

//   expect(a.classList).toContain("active");
// });

// test("renders a Directors <NavLink>", async () => {
//   const a = screen.queryByText(/Directors/);

//   expect(a).toBeInTheDocument();
//   expect(a.tagName).toBe("A");
//   expect(a.href).toContain("/");

//   fireEvent.click(a, { button: 0 });

//   expect(a.classList).toContain("active");
// });







import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import { vi } from "vitest";
import { act } from "react";
import { act } from "react";

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
    return Promise.reject(new Error("Movie not found"));
  });
});

let container;

beforeEach(() => {
  container = render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  ).container;
});

test('wraps content in a div with "navbar" class', () => {
  expect(container.querySelector(".navbar")).toBeInTheDocument();
});

test("renders a Home <NavLink>", async () => {
  const homeLink = screen.queryByText(/Home/);
  expect(homeLink).toBeInTheDocument();
  expect(homeLink.tagName).toBe("A");
  expect(homeLink.href).toContain("/");

  await act(async () => {
    fireEvent.click(homeLink, { button: 0 });
  });
  expect(homeLink.classList).toContain("active");
});

test("renders an Actors <NavLink>", async () => {
  const actorsLink = screen.queryByText(/Actors/);
  expect(actorsLink).toBeInTheDocument();
  expect(actorsLink.tagName).toBe("A");
  expect(actorsLink.href).toContain("/actors");

  await act(async () => {
    fireEvent.click(actorsLink, { button: 0 });
  });
  expect(actorsLink.classList).toContain("active");
});

test("renders a Directors <NavLink>", async () => {
  const directorsLink = screen.queryByText(/Directors/);
  expect(directorsLink).toBeInTheDocument();
  expect(directorsLink.tagName).toBe("A");
  expect(directorsLink.href).toContain("/directors");

  await act(async () => {
    fireEvent.click(directorsLink, { button: 0 });
  });
  expect(directorsLink.classList).toContain("active");
});

// Clean up fetch mock after all tests
afterAll(() => {
  global.fetch.mockRestore();
});
