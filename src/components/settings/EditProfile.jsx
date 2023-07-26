import { useContext, useRef, useState } from "react";
import ".././form.css";
import { UserContext } from "../../pages/App/App";
import sendRequest from "../../utilities/send-request";

export default function EditProfile() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);
  const [displayname, setDisplayname] = useState("");
  const [displaypic, setDisplayPic] = useState(null);
  const [birthdate, setBirthdate] = useState("");
  const [bio, setBio] = useState("");
  const { user } = useContext(UserContext);

  async function handleEditProfile(e) {
    e.preventDefault();
    console.log("Display Name:", displayname);
    console.log("Profile Picture:", displaypic);
    console.log("Date of Birth:", birthdate);
    console.log("Profile Description:", bio);
    try {
      const response = await sendRequest(`/api/profiles/editProfile`, "PATCH", {
        displayname: displayname,
        birthdate: birthdate,
        bio: bio,
      });
      console.log(response);
      setErrorMsg(null);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setErrorMsg(true);
    }
  }

  return (
    <>
      <form className="form-container" onSubmit={handleEditProfile}>
        <h1 className="text-center">Edit Profile</h1>
        <div className="flex flex-col">
          <label className="mb-1 mt-5">Display Name</label>
          <input
            className="border p-2"
            type="text"
            value={displayname}
            onChange={(e) => setDisplayname(e.target.value)}
            autoComplete="off"
          />
        </div>
        {/* Profile Picture Upload */}
        <div className="flex flex-col mt-5">
          <label className="mb-1">Profile Picture</label>
          <input
            className="border p-2"
            type="file"
            onChange={(e) => setDisplayPic(e.target.files[0])}
            accept="image/*"
          />
        </div>
        <div className="flex flex-col mt-5">
          <label className="mb-1">Date of Birth</label>
          <input
            className="border p-2"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label className="mb-1">Profile Description</label>
          <textarea
            className="p-2 w-80 h-16"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={300}
          />
        </div>
        <button className="bg-purple-500 hover:bg-purple-700 m-5">
          Save Changes
        </button>
        {success && (
          <div className="text-green-500">
            Successfully upated your profile!
          </div>
        )}
        {errorMsg && (
          <div className="text-red-500">Error, please try again!</div>
        )}
      </form>
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
}
