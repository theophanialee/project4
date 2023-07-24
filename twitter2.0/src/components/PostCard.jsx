import { useState } from "react";
import getTimeDifference from "./getTimeDiffernce";
import MoreOptions from "./post/MoreOptions";
import { UserContext } from "../pages/App/App";
import { Link } from "react-router-dom";

export default function PostCard({ user, posts }) {
  const [copiedPostId, setCopiedPostId] = useState(null);

  function handleShare(postId) {
    const postLink = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postLink);
    setCopiedPostId(postId);
    setTimeout(() => {
      setCopiedPostId(null);
    }, 1000);
  }

  function handleLike(postId) {
    console.log("user like:", postId);
  }
  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="my-1 px-5 py-2 bg-neutral-900">
          <Link to={`/post/${post._id}`}>
            <div className="flex justify-between">
              <div className="my-2 text-xl">@{post.user.username}</div>
              <div className="my-2 text-xs">
                {getTimeDifference(post.createdAt)}
              </div>
            </div>
            <div className="py-2">{post.content}</div>
          </Link>
          <div className="my-2 flex items-center">
            {/* Reply */}
            <button>🗨</button>
            {/* Retweet button */}
            <button>↺</button>
            {/* Like button */}
            <button onClick={() => handleLike(post._id)}>♡</button>
            {/* Share button */}
            <button onClick={() => handleShare(post._id)}>⇧</button>
            {/* Use the MoreOptions component and pass the post object */}
            {post.user._id === user._id && <MoreOptions post={post} />}
          </div>
          {copiedPostId === post._id && (
            <div
              className="absolute bg-green-500 text-white py-1 px-3 rounded"
              style={{
                marginTop: "-5.5rem",
                marginLeft: "10rem",
                width: "120px",
              }}
            >
              Copied link!
            </div>
          )}
        </div>
      ))}
    </>
  );
}
