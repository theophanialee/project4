import { Link } from "react-router-dom";
// import { signIn } from "../utilities/users-service"; // Assuming you have a sign-in function in your users-service.js
import { useRef, useState } from "react";
import "./form.css";

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState(null);
  const usernameRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      // const user = await signIn(formData); // Assuming signIn function is available in your users-service.js
      // Handle successful login, e.g., redirect to a different page
    } catch {
      setErrorMsg("* Invalid username or password");
    }
  }

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="text-center">Log In</h1>
        <div className="flex flex-col">
          <label className="mb-1 mt-2">Username</label>{" "}
          <input
            className="border p-2"
            type="text"
            name="username"
            ref={usernameRef}
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 mt-2">Password</label>
          <input
            className="border p-2"
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 m-5">Log In</button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
      <div className="text-center">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
