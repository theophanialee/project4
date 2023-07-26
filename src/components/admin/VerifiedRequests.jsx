import { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import sendRequest from "../../utilities/send-request";

export default function VerifiedRequests() {
  const [userReqs, setUserReqs] = useState([]);

  async function getRequests() {
    try {
      const requstedUsers = await sendRequest("/api/users/admin/getrequests");
      console.log(requstedUsers);

      requstedUsers.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUserReqs(requstedUsers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <>
      <h1 className="m-5"> ✓ Requests to be approved</h1>
      <RequestCard userReqs={userReqs} />
    </>
  );
}
