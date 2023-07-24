import { useContext, useRef, useState } from "react";
import ".././form.css";
import { UserContext } from "../../pages/App/App";

// You may need to import other utility functions for profile picture upload and date of birth update

export default function EditUser() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [displayName, setDisplayName] = useState(""); // State for display name input
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture file
  const [dateOfBirth, setDateOfBirth] = useState(""); // State for date of birth input
  const [profileDescription, setProfileDescription] = useState(""); // State for profile description input

  const { user } = useContext(UserContext);

  // Function to handle submit form
  async function handleSubmit(e) {
    e.preventDefault();

    // You can use the states (displayName, profilePicture, dateOfBirth, profileDescription) to update the user's information
    // For demonstration purposes, let's just log the information
    console.log("Display Name:", displayName);
    console.log("Profile Picture:", profilePicture);
    console.log("Date of Birth:", dateOfBirth);
    console.log("Profile Description:", profileDescription);

    setErrorMsg(null); // Reset error message
  }

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="text-center">Edit User</h1>
        <div className="flex flex-col">
          <label className="mb-1 mt-5">Display Name</label>
          <input
            className="border p-2"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="off"
          />
        </div>
        {/* Profile Picture Upload */}
        <div className="flex flex-col mt-5">
          <label className="mb-1">Profile Picture</label>
          <input
            className="border p-2"
            type="file"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            accept="image/*"
          />
        </div>
        <div className="flex flex-col mt-5">
          <label className="mb-1">Date of Birth</label>
          <input
            className="border p-2"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label className="mb-1">Profile Description</label>
          <textarea
            className="border p-2"
            rows="4"
            value={profileDescription}
            onChange={(e) => setProfileDescription(e.target.value)}
            maxLength={500} // Set maximum character limit for the profile description
          />
        </div>
        <button className="bg-purple-500 hover:bg-purple-700 m-5">
          Save Changes
        </button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
}
