import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <label>Username</label>
      <input></input>
      <label>Password</label>
      <input></input>
      <h3>No account yet?</h3>
      <h3>
        {" "}
        <Link to="/signup">
          <u>Sign up</u>
        </Link>
        now
      </h3>
    </>
  );
}
