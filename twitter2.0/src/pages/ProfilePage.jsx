import sendRequest from "../utilities/send-request";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App/App";
import PostCard from "../components/PostCard";

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  async function getPosts() {
    try {
      const postsData = await sendRequest("/api/posts/getPosts");
      console.log(postsData);
      postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(postsData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl font-bold p-5">{user.username}</h1>
      <PostCard user={user} posts={posts} />
    </div>
  );
}
