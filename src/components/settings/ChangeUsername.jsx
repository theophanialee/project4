import { useContext, useRef, useState } from "react";
import ".././form.css";
import { checkUsername } from "../../utilities/users-api";
import sendRequest from "../../utilities/send-request";

export default function ChangeUsername() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [doesUnExist, setDoesUnExist] = useState(undefined);
  const [isUnValid, setIsUnValid] = useState(false);
  const [firstCheck, setFirstCheck] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const newUsernameRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const newUsername = newUsernameRef.current.value;
    console.log("New Username:", newUsername);
    try {
      await sendRequest(`/api/users/editUsername`, "PATCH", { newUsername });
      setErrorMsg(null);
      setSuccessMsg(true);
    } catch (error) {
      console.log(error);
      setErrorMsg("Failed to update username. Please try again.");
    }
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
    setSuccessMsg(false);
  }

  return (
    <>
      <h1 className="m-5">Change Username</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-1 mt-5">New Username</label>
          <div className="flex">
            <div className="pr-2 mt-3">@</div>
            <input
              className="border p-2 h-12"
              name="newUsername"
              placeholder="New username"
              ref={newUsernameRef}
              autoComplete="off"
              onChange={handleUsernameChange} // Add the event listener to reset error messages
            />
            <button
              type="button"
              onClick={handleCheckUN}
              className="bg-purple-950 mx-5"
            >
              Check if available
            </button>
          </div>
        </div>

        {firstCheck ? (
          doesUnExist ? (
            <div className="text-red-500 mt-2">Username taken</div>
          ) : (
            <div className="text-green-500 mt-2">Username available!</div>
          )
        ) : null}
        {isUnValid && (
          <div className="text-red-700 mt-2">
            Username has to be longer than 5 characters
          </div>
        )}
        <button className="bg-purple-500 hover:bg-purple-700 m-5">
          Change Username
        </button>
        <div className="flex flex-col items-center">
          {errorMsg && <div className="text-red-500">{errorMsg}</div>}
          {successMsg && (
            <div className="m-5 text-green-500 text-center">
              Successfully updated!
              <br />
              Please re-login with your new username to update your profile.
            </div>
          )}
        </div>
      </form>
    </>
  );
}
