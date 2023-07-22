import sendRequest from "../utilities/send-request";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App/App";

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  async function getPosts() {
    try {
      const postsData = await sendRequest("/api/posts/getPosts");
      console.log(postsData);
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
      <div className="p-10">
        <h1>{user.username}</h1>
        {posts.map((post) => (
          <div key={post._id} className="my-5">
            <div className="my-2">{post.user.username}</div>
            <div className=""> {post.content}</div>
          </div>
        ))}
      </div>
    </>
  );
}
