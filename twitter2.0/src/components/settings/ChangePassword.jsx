import { useContext, useRef, useState } from "react";
import ".././form.css";

export default function ChangePassword() {
  const [errorMsg, setErrorMsg] = useState(null);
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // Additional validation if needed
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      // You can handle the password change logic here
      // For example, call an API to update the password
      // or use your existing change password utility function
      // For demonstration purposes, let's just log the passwords
      console.log("Old Password:", oldPassword);
      console.log("New Password:", newPassword);
      console.log("Confirm Password:", confirmPassword);

      setErrorMsg(null); // Reset error message
    } catch {
      setErrorMsg("Password Change Failed - Try Again");
    }
  }

  return (
    <>
      <h1 className="m-5">Change Password</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-1 mt-5">Old Password</label>{" "}
          <input
            className="border p-2"
            type="password"
            name="oldPassword"
            ref={oldPasswordRef}
            autoComplete="current-password"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 mt-5">New Password</label>
          <input
            className="border p-2"
            type="password"
            name="newPassword"
            ref={newPasswordRef}
            autoComplete="new-password"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 mt-5">Confirm Password</label>
          <input
            className="border p-2"
            type="password"
            name="confirmPassword"
            ref={confirmPasswordRef}
            autoComplete="new-password"
          />
        </div>
        <button className="bg-purple-500 hover:bg-purple-700 m-5">
          Change Password
        </button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
}
