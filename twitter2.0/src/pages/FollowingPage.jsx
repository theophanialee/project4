import { useEffect, useState } from "react";
import { useParams } from "react-router";
import sendRequest from "../utilities/send-request";
import { Link } from "react-router-dom";
import FollowProfileCard from "../components/FollowProfileCard";

export default function FollowingPage() {
  const params = useParams();
  const profileId = params.profileId;
  const [profiles, setProfiles] = useState([]);
  const [users, setUsers] = useState([]);

  async function getFollowing() {
    try {
      const followingArray = await sendRequest(
        `/api/relationships/getFollowing/${profileId}`
      );
      console.log(followingArray.followingProfiles);
      console.log(followingArray.followingUsers);
      setProfiles(followingArray.followingProfiles);
      setUsers(followingArray.followingUsers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollowing();
  }, []);

  return (
    <>
      <h1 className="m-5">Following Page</h1>
      <FollowProfileCard users={users} profiles={profiles} />
    </>
  );
}
