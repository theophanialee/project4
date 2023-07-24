import { signUp, checkUsername } from "../utilities/users-service";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";

export default function SignUpForm() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [doesUnExist, setDoesUnExist] = useState(undefined);
  const [isUnValid, setIsUnValid] = useState(false);
  const [firstCheck, setFirstCheck] = useState(false);
  const usernameRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (e.target.password.value !== e.target.confirmPassword.value) {
      setErrorMsg("Passwords do not match");
      return;
    }
    const formData = {
      username: e.target.username.value,
      normalizedUsername: e.target.username.value.toLowerCase(),
      email: e.target.email.value,
      password: e.target.password.value,
    };
    navigate("/login");
    try {
      const user = await signUp(formData);
    } catch {
      setErrorMsg(
        "* Check if username is available * There is an existing account with this email"
      );
    }
  }

  async function handleCheckUN() {
    const username = usernameRef.current.value.trim().toLowerCase(); // Access the value of the username input field
    console.log(username);
    if (username.length < 5) {
      setIsUnValid(true); // Set an error message
      return; // Return early without submitting the form
    }

    try {
      const checkUN = await checkUsername(username);
      console.log(checkUN);
      setDoesUnExist(checkUN);
      setFirstCheck(true);
    } catch {
      console.log("Error in checking UN");
    }
  }

  // Function to handle username input change and reset error messages
  function handleUsernameChange() {
    setErrorMsg(null);
    setIsUnValid(false);
    setFirstCheck(false);
  }

  return (
    <>
      <form
        className="before-login fixed top-0 right-0 w-1/2 h-5/4 text-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center">Create a new account!</h1>
        <div className="flex flex-col">
          <label className="mb-1 mt-2">Username</label>{" "}
          <input
            className="border p-2"
            type="text"
            name="username"
            ref={usernameRef}
            autoComplete="username"
            onChange={handleUsernameChange} // Add the event listener to reset error messages
          />
        </div>
        <button
          type="button"
          onClick={handleCheckUN}
          className="bg-purple-950 m-5"
        >
          Check if available
        </button>
        {firstCheck ? (
          doesUnExist ? (
            <div className="text-red-700"> Username taken </div>
          ) : (
            <div className="text-green-700"> Username available! </div>
          )
        ) : null}
        {isUnValid && (
          <div className="text-red-700">
            Username has to be longer than 5 characters
          </div>
        )}
        <div className="flex flex-col">
          <label className="mb-1 mt-2">Email</label>
          <input
            className="border p-2"
            type="email"
            name="email"
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 mt-2">Password</label>
          <input
            className="border p-2"
            type="password"
            name="password"
            autoComplete="new-password"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 mt-2">Confirm password</label>
          <input
            className="border p-2"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
          />
        </div>
        <button className="bg-purple-500 hover:bg-purple-700 m-5">
          Confirm
        </button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
}
