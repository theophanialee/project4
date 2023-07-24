import { useState } from "react";
import ".././form.css";

export default function Privacy() {
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Is Private:", isPrivate);
    // You can perform any additional actions here, like sending the data to the server.
  };

  return (
    <>
      <h1 className="m-5">Privacy Settings</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="checkbox"
            id="privateAccount"
            className="form-checkbox h-5 w-5"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          <label htmlFor="privateAccount" className="ml-2">
            Private Account
          </label>
        </div>
        <button
          type="submit"
          className="bg-purple-950 mt-4 py-2 px-4 text-white"
        >
          Submit
        </button>
      </form>
    </>
  );
}
