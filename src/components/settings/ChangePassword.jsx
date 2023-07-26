import { useRef, useState } from "react";
import ".././form.css";
import sendRequest from "../../utilities/send-request";

export default function ChangePassword() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      const response = await sendRequest(`/api/users/changePassword`, "PATCH", {
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      console.log(response);
      setSuccess(response);
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
            ref={currentPasswordRef}
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
        <button type="submit" className="bg-purple-500 hover:bg-purple-700 m-5">
          Change Password
        </button>
        {errorMsg && <div className="text-red-500">{errorMsg}</div>}
        {success && <div className="text-green-500">{success}</div>}
      </form>
    </>
  );
}
