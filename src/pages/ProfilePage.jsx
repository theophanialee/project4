import sendRequest from "../utilities/send-request";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App/App";
import PostCard from "../components/PostCard";
import { useParams } from "react-router";
import FollowButton from "../components/FollowButton";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({});
  const [isFollowing, setIsFollowing] = useState();

  const { user } = useContext(UserContext);
  const { username } = useParams();

  console.log(username);

  async function getPosts() {
    try {
      const postsData = await sendRequest(`/api/posts/getPosts/${username}`);
      console.log(postsData);
      postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(postsData);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProfile() {
    try {
      const profileData = await sendRequest(
        `/api/profiles/getProfile/${username}`
      );
      console.log(profileData);
      setProfile(profileData);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkFollowing() {
    try {
      const isFollowingData = await sendRequest(
        `/api/relationships/checkFollowing/${username}`
      );
      console.log(isFollowingData);
      setIsFollowing(isFollowingData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts();
    getProfile();
    checkFollowing();
  }, [username]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="p-5 flex flex-col">
        <h1 className="text-2xl font-bold">{profile.displayname}</h1>
        <h1 className="text-sm font-bold">@{username}</h1>

        {user.username !== username && (
          <FollowButton
            user={user}
            username={username}
            isFollowing={isFollowing}
          />
        )}
        <p className="">{profile.bio}</p>
      </div>

      <div className="flex">
        <div className="flex flex-col w-full">
          <div className="flex text-lg">
            <div className="flex-1 px-5">
              <Link to={`/following/${username}/${profile._id}`}>
                <span>2</span> Following
              </Link>
            </div>
            <div className="flex-1 px-5">
              <Link to={`/followers/${username}/${profile._id}`}>
                <span>3</span> Followers
              </Link>
            </div>
          </div>

          <div className="flex mx-5 my-2 mb-3">
            <div className="flex-1">
              {profile.birthdate && (
                <p className="text-sm">🎂 {formatDate(profile.birthdate)}</p>
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm ml-5">
                Joined {formatDate(profile.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <PostCard user={user} posts={posts} />
      </div>
    </>
  );
}