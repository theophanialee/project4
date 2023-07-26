import { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import sendRequest from "../../utilities/send-request";

export default function VerifiedRequests() {
  const [userReq, setUserReq] = useState();

  async function getRequests() {
    try {
      const requstedUsers = await sendRequest("/api/users/admin/getrequests");
      console.log(requstedUsers);
      // // Sort the requests by time (most recent first)
      // requstedUsers.sort(
      //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      // );
      // setPosts(requstedUsers);
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
      <RequestCard />
    </>
  );
}
