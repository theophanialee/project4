// import { signIn } from "../utilities/users-service"; // Assuming you have a sign-in function in your users-service.js
import { useContext, useRef, useState } from "react";
import "./form.css";
import { UserContext } from "../pages/App/App";
import { login } from "../utilities/users-service";
import sendRequest from "../utilities/send-request";

export default function VerifiedForm() {
  const [errorMsg, setErrorMsg] = useState(null);
  const reason = useRef(null);
  const { user, setUser } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const verifiedReq = reason.current.value;
      console.log("reason:", verifiedReq);
      const response = await sendRequest(
        "/api/users/requestverified",
        "PATCH",
        { verifiedReq: verifiedReq }
      );
      console.log("reponse", response);
    } catch (error) {
      console.log("error");
      setErrorMsg(true);
    }
  }

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="text-center">✓ Get verified today!</h1>

        <div className="flex flex-col mt-10">
          <div className="mb-10">
            <div className="text-2xl"> Benefits </div>
            <ul>
              <li>• Increase character limit to 420</li>
              <li>• Prioritized posts to your followers</li>
              <li>• Get recommended!</li>
            </ul>
          </div>
          <div>
            <div className="text-2xl"> Price </div>
            <div>Free for the first month</div>
          </div>
          <div className="mt-10">
            <div className="text-2xl"> Let us know!</div>
          </div>
          <label className="mb-1 mt-2">Reason for verified account:</label>
          <input className="border p-2" ref={reason} />
        </div>
        <button className="bg-purple-500 hover:bg-purple-700 my-10">
          Request
        </button>
        {errorMsg && <div className="text-red-500">Already requested!</div>}
      </form>
    </>
  );
}
