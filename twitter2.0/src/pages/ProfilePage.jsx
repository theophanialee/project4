import sendRequest from "../utilities/send-request";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App/App";

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

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
      {posts.map((post) => (
        <div key={post._id} className="my-1 px-5 py-2 bg-neutral-900">
          <div className="flex justify-between">
            <div className="my-2 text-xl">@{post.user.username}</div>
            <div className="my-2 text-xs">
              {getTimeDifference(post.createdAt)}
            </div>
          </div>
          <div className="py-2">{post.content}</div>
          <div className="my-2">
            {/* Reply */}
            <button>🗨</button>
            {/* Retweet button */}
            <button>↺</button>
            {/* Like button */}
            <button>♡</button>
            {/* Share button */}
            <button>⇧</button>
          </div>
        </div>
      ))}
    </div>
  );
}
