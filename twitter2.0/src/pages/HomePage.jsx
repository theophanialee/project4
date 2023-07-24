import sendRequest from "../utilities/send-request";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App/App";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [tooLong, setTooLong] = useState(false);

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

  const handleInputChange = (event) => {
    setContent(event.target.value);
    setTooLong(false);
  };

  async function handleSubmit() {
    console.log("New post:", content);
    try {
      await sendRequest(`/api/posts/newpost`, "POST", {
        content: content,
      });

      setContent("");
      setTooLong(false);
      navigate("/");
      getPosts();
    } catch (error) {
      console.log(error);
      setTooLong(true);
    }
  }

  return (
    <>
      <div className="">
        <h1 className="p-5">Home</h1>
        <div className="bg-neutral-900 max-w-full w-full relative rounded-2xl p-5">
          <textarea
            className="bg-neutral-900 pt-5 w-full resize-none "
            style={{ outline: "none" }}
            placeholder="What are you thinking about?"
            value={content}
            onChange={handleInputChange}
            rows={5}
          />
          <div className="flex justify-end">
            {tooLong && (
              <div className="text-right mt-2 mr-5 text-red-500">
                Post is too long
              </div>
            )}
            <div
              className={`text-right mt-2 mr-5 ${
                content.length > 280 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {content.length}
            </div>
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-3 mr-3 rounded mr-2"
              onClick={handleSubmit}
            >
              Spill!
            </button>
          </div>
        </div>
        <PostCard user={user} posts={posts} />
      </div>
    </>
  );
}
