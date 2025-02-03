import NavBar from "../components/NavBar";

function ErrorPage() {
  return (
    <>
      <NavBar />
      <main>
        <h1>Oops! Looks like something went wrong.</h1>
        <p>The page you are looking for does not exist or an error occurred.</p>
      </main>
    </>
  );
}

export default ErrorPage;
