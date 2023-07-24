import sendRequest from "../utilities/send-request";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App/App";
import PostCard from "../components/PostCard";
import { useParams } from "react-router";
import FollowButton from "../components/FollowButton";

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    getPosts();
  }, [username]);

  return (
    <>
      <div className="p-5 flex items-center">
        <h1 className="text-2xl font-bold mr-2">@{username}</h1>
        {user.username !== username && (
          <FollowButton user={user} username={username} />
        )}
      </div>
      <div className="p-5 flex">
        <div className="flex flex-col w-full">
          <div className="flex">
            <div className="flex-1">
              <span>2</span> Following
            </div>
            <div className="flex-1">
              <span>3</span> Followers
            </div>
          </div>

          <div className="mt-5">bio here</div>
        </div>
      </div>
      <div className="">
        <PostCard user={user} posts={posts} />
      </div>
    </>
  );
}
