import { useEffect, useState } from "react";
import { useParams } from "react-router";
import sendRequest from "../utilities/send-request";
import ProfileCard from "../components/ProfileCard";

export default function FollowersPage() {
  const params = useParams();
  const profileId = params.profileId;
  const [profiles, setProfiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [isFollowing, setIsFollowingFollower] = useState([]);

  async function getFollowers() {
    try {
      const followerArray = await sendRequest(
        `/api/relationships/getFollowers/${profileId}`
      );
      const followerProfilesArray = followerArray.map(
        (follower) => follower.followerProfileId
      );
      setProfiles(followerProfilesArray);

      const followerUsersArray = followerArray.map(
        (follower) => follower.followerProfileId.user
      );
      setUsers(followerUsersArray);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkFollowing(username) {
    try {
      const isFollowingData = await sendRequest(
        `/api/relationships/checkFollowing/${username}`
      );
      return isFollowingData;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    // Fetch the followers data on page refresh
    getFollowers();
  }, []);

  useEffect(() => {
    async function fetchData() {
      // Run the checkFollowing function for each username in the users array
      const followingData = await Promise.all(
        users.map((user) => checkFollowing(user.username))
      );
      setIsFollowingFollower(followingData);
      console.log(followingData);
    }

    fetchData();
  }, [users]);

  return (
    <>
      <h1 className="m-5">Followers Page</h1>
      <ProfileCard
        users={users}
        profiles={profiles}
        isFollowing={isFollowing}
      />
    </>
  );
}
