import { useState } from "react";
import sendRequest from "../../utilities/send-request";

export default function RequestCard({ userReqs }) {
  const [success, setSuccess] = useState(false);

  async function handleApproval(userId) {
    console.log("approve req for", userId);
    try {
      const approve = await sendRequest(
        `/api/users/admin/approveverified/${userId}`,
        "PATCH"
      );
      console.log(approve);
      setSuccess(true);
      window.alert("Successfully approved! Refresh to update requests.");
    } catch (error) {
      console.log("error in approval");
    }
  }

  return (
    <>
      {userReqs.map((user) => (
        <div key={user._id} className="my-5 mx-5">
          <div className="my-3">Username: {user.username}</div>
          <div className="my-3">Reason: {user.verifiedReq}</div>
          <button onClick={() => handleApproval(user._id)}>
            Approve Verification
          </button>
        </div>
      ))}
    </>
  );
}
