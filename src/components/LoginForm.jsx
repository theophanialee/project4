// import { signIn } from "../utilities/users-service"; // Assuming you have a sign-in function in your users-service.js
import { useContext, useRef, useState } from "react";
import "./form.css";
import { UserContext } from "../pages/App/App";
import { login } from "../utilities/users-service";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState(null);
  const usernameRef = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const existingUser = await login(credentials);
      setSuccessMsg("Successfully logged in! Taking you home...");
      setTimeout(() => {
        setUser(existingUser);
        navigate("/home");
      }, 2000);
    } catch {
      setErrorMsg("Log In Failed - Try Again");
    }
  }

  return (
    <>
      <form className="before-login" onSubmit={handleSubmit}>
        <h1 className="text-center">Log In</h1>
        <div className="flex flex-col">
          <label className="mb-1 mt-5">Username</label>{" "}
          <input
            className="border p-2"
            type="text"
            name="username"
            ref={usernameRef}
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 mt-5">Password</label>
          <input
            className="border p-2"
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </div>
        <button className="bg-purple-500 hover:bg-purple-700 m-5">
          Log In
        </button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
      {successMsg && <p className="text-green-500">{successMsg}</p>}
    </>
  );
}
