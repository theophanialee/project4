import sendRequest from "../utilities/send-request";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App/App";
import { useNavigate } from "react-router-dom";
import SinglePostCard from "../components/SinglePostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  async function getPosts() {
    try {
      const postsData = await sendRequest("/api/posts/getFollowingPosts");
      console.log(postsData);
      // Sort the posts by time (most recent first)
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
    <>
      <div className="">
        <h1 className="p-5">Home page</h1>
        <SinglePostCard user={user} posts={posts} />
      </div>
    </>
  );
}
