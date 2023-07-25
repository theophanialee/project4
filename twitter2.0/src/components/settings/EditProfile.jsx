import { useContext, useRef, useState } from "react";
import ".././form.css";
import { UserContext } from "../../pages/App/App";
import sendRequest from "../../utilities/send-request";

export default function EditProfile() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const { user } = useContext(UserContext);

  async function handleEditProfile(e) {
    e.preventDefault();
    console.log("Display Name:", displayName);
    console.log("Profile Picture:", profilePicture);
    console.log("Date of Birth:", dateOfBirth);
    console.log("Profile Description:", profileDescription);
    setErrorMsg(null);
    try {
      const response = await sendRequest(`api/profiles/editProfile`, "PATCH");
      console.log(response);
      setErrorMsg(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form className="form-container" onSubmit={handleEditProfile}>
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
            maxLength={300}
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
