import sendRequest from "../utilities/send-request";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App/App";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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

  // Function to calculate time difference in minutes
  const getTimeDifference = (timestamp) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const timeDifferenceInSeconds = Math.floor((currentTime - postTime) / 1000);

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds}s`;
    } else {
      const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);

      if (timeDifferenceInMinutes < 60) {
        return `${timeDifferenceInMinutes}m`;
      } else {
        const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
        return `${timeDifferenceInHours}h`;
      }
    }
  };

  // Handle post click
  const handleClickPost = (postId) => {
    console.log("Go to path post/:id:", postId);
    navigate(`/post/${postId}`);
  };

  // Handle reply button click
  const handleReply = (postId) => {
    console.log("Reply to post with ID:", postId);
  };

  // Handle like button click
  const handleLike = (postId) => {
    console.log("Liked post with ID:", postId);
  };

  // Handle retweet button click
  const handleRetweet = (postId) => {
    console.log("Retweeted post with ID:", postId);
  };

  // Handle share button click
  const handleShare = (postId) => {
    console.log("Shared post with ID:", postId);
  };

  return (
    <>
      <div className="">
        <h1 className="p-5">Home page</h1>
        {posts.map((post) => (
          <div key={post._id} className="my-1 px-5 py-2 bg-neutral-900">
            <div className="flex justify-between">
              <div className="my-2 text-xl">@{post.user.username}</div>
              <div className="my-2 text-xs">
                {getTimeDifference(post.createdAt)}
              </div>
            </div>
            <div className="py-2"> {post.content}</div>
            <div className="my-2">
              {/* Reply */}
              <button onClick={() => handleReply(post._id)}>🗨</button>
              {/* Retweet button */}
              <button onClick={() => handleRetweet(post._id)}>↺</button>
              {/* Like button */}
              <button onClick={() => handleLike(post._id)}>♡</button>
              {/* Share button */}
              <button onClick={() => handleShare(post._id)}>⇧</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
