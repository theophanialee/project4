import { useState } from "react";
import getTimeDifference from "./getTimeDiffernce";
import MoreOptions from "./post/MoreOptions";
import { Link, useNavigate } from "react-router-dom";
import sendRequest from "../utilities/send-request";
import ReplyPopUp from "./ReplyPopUp";

export default function PostCard({ user, posts }) {
  const [copiedPostId, setCopiedPostId] = useState(null);
  const navigate = useNavigate();

  function handleShare(postId) {
    const postLink = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postLink);
    setCopiedPostId(postId);
    setTimeout(() => {
      setCopiedPostId(null);
    }, 1000);
  }

  async function handleLike(postId) {
    console.log("user like/unlike:", postId);
    try {
      const response = await sendRequest(`api/posts/like/${postId}`, "PATCH");
      console.log("Response data:", response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleReply(postId) {
    console.log(postId);
    navigate(`/reply/${postId}`);
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="my-1 px-5 py-2 bg-neutral-900">
          <Link to={`/profile/${post.user.username}`}>
            <div className="my-2 text-xl">@{post.user.username}</div>
          </Link>
          <div className="flex justify-between">
            <Link to={`/post/${post._id}`}>
              <div className="py-2">{post.content}</div>
            </Link>
            <div className="my-2 text-xs">
              {getTimeDifference(post.createdAt)}
              {post.user._id === user._id && <MoreOptions post={post} />}
            </div>
          </div>

          <div className="my-2 flex items-center">
            {/* Reply */}
            <button onClick={() => handleReply(post._id)} className="mx-2">
              🗨
            </button>

            <div className="mx-3">{post.replies.length}</div>
            {/* Retweet button */}
            <button className="mx-4">↺</button>
            <div className="mx-2">{post.reposts.length}</div>
            {/* Like button */}
            <button onClick={() => handleLike(post._id)} className="mx-4">
              {post.likes.includes(user._id) ? "♥" : "♡"}
            </button>
            <div className="mx-2">{post.likes.length}</div>
            {/* Share button */}
            <button onClick={() => handleShare(post._id)} className="mx-4">
              ⇧
            </button>
            {/* Use the MoreOptions component and pass the post object */}
          </div>
          {copiedPostId === post._id && (
            <div
              className="absolute bg-green-500 text-white py-1 px-3 rounded"
              style={{
                marginTop: "-5.5rem",
                marginLeft: "20rem",
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
