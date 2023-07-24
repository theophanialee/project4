import { useContext, useRef, useState } from "react";
import ".././form.css";
import { checkUsername } from "../../utilities/users-api";

export default function ChangeUsername() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [doesUnExist, setDoesUnExist] = useState(undefined);
  const [isUnValid, setIsUnValid] = useState(false);
  const [firstCheck, setFirstCheck] = useState(false);
  const newUsernameRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const newUsername = newUsernameRef.current.value.trim().toLowerCase();

    // Additional validation if needed
    // For demonstration purposes, let's just log the new username
    console.log("New Username:", newUsername);

    setErrorMsg(null); // Reset error message
  }

  async function handleCheckUN() {
    const newUsername = newUsernameRef.current.value.trim().toLowerCase();
    console.log(newUsername);
    if (newUsername.length < 5) {
      setIsUnValid(true); // Set an error message
      return; // Return early without checking username availability
    }

    try {
      const checkUN = await checkUsername(newUsername);
      console.log(checkUN);
      setDoesUnExist(checkUN);
      setFirstCheck(true);
    } catch {
      console.log("Error in checking username");
    }
  }

  // Function to handle new username input change and reset error messages
  function handleUsernameChange() {
    setErrorMsg(null);
    setIsUnValid(false);
    setFirstCheck(false);
  }

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="text-center">Change Username</h1>
        <div className="flex flex-col">
          <label className="mb-1 mt-5">New Username</label>
          <div className="flex items-center">
            <div className="pr-2">@</div>
            <input
              className="border p-2"
              type="text"
              name="newUsername"
              placeholder="New username"
              ref={newUsernameRef}
              autoComplete="off"
              onChange={handleUsernameChange} // Add the event listener to reset error messages
            />
          </div>
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
            <div className="text-red-700">Username taken</div>
          ) : (
            <div className="text-green-700">Username available!</div>
          )
        ) : null}
        {isUnValid && (
          <div className="text-red-700">
            Username has to be longer than 5 characters
          </div>
        )}
        <button className="bg-purple-500 hover:bg-purple-700 m-5">
          Change Username
        </button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
}
