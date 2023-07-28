import { useContext, useRef, useState, useEffect } from "react"; // Import useEffect here
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
  const [isLoading, setIsLoading] = useState(false); // Add a loading state
  console.log(user);
  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      setIsLoading(true);
      setSuccessMsg("Logging in...");
      const existingUser = await login(credentials);
      console.log(existingUser);
      setUser(existingUser);
      setSuccessMsg("Successfully logged in!");
      navigate("/home");
    } catch {
      setErrorMsg("Log In Failed - Try Again");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (successMsg === "Successfully logged in!") {
      navigate("/home");
    }
  }, [successMsg, navigate]);

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
            placeholder="Username or email"
            defaultValue=""
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 mt-5">Password</label>
          <input
            className="border p-2"
            type="password"
            name="password"
            placeholder="Password"
            defaultValue=""
          />
        </div>
        <button
          className="bg-purple-500 hover:bg-purple-700 m-5"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
      {successMsg && <p className="text-green-500">{successMsg}</p>}
    </>
  );
}
