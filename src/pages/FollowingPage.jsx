import { useEffect, useState } from "react";
import { useParams } from "react-router";
import sendRequest from "../utilities/send-request";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";

export default function FollowingPage() {
  const params = useParams();
  const profileId = params.profileId;
  const [profiles, setProfiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(true);

  async function getFollowing() {
    try {
      const followingArray = await sendRequest(
        `/api/relationships/getFollowing/${profileId}`
      );
      const followingProfilesArray = followingArray.map(
        (following) => following.followingProfileId
      );
      setProfiles(followingProfilesArray);
      console.log(followingProfilesArray);
      const followingUsersArray = followingArray.map(
        (following) => following.followingProfileId.user
      );
      setUsers(followingUsersArray);
      console.log(followingUsersArray);
      setIsFollowing(true);
      console.log(isFollowing);
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
      <ProfileCard
        users={users}
        profiles={profiles}
        isFollowing={isFollowing}
      />
    </>
  );
}
