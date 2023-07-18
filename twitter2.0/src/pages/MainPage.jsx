import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <h1>POSTS HERE</h1>
      <Link to="/login">
        <button>Sign in</button>
      </Link>
    </>
  );
}
