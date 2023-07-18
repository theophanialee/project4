import { Link } from "react-router-dom";
import { signUp } from "../utilities/users-service";
import { useState } from "react";

export default function SignUpForm() {
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      handle: e.target.handle.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const user = await signUp(formData);
      // Handle successful sign-up here if needed
    } catch {
      // An error occurred
      setError("Sign Up Failed - Try Again");
    }
  }

  return (
    <>
      <form className="form grid gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-1">Username</label>
          <input className="border p-2" type="text" name="handle" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Email</label>
          <input className="border p-2" type="email" name="email" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Password</label>
          <input className="border p-2" type="password" name="password" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Confirm password</label>
          <input className="border p-2" type="password" />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Confirm
        </button>
      </form>
    </>
  );
}
