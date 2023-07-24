import { useState } from "react";
import getTimeDifference from "./getTimeDiffernce";

export default function SinglePostCard({ user, posts }) {
  const [showDropdown, setShowDropdown] = useState(false); // State for "More Options" dropdown
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for tracking the dropdown visibility

  // Function to close the dropdown when the "More Options" button is clicked again
  const handleMoreOptionsClick = () => {
    setShowDropdown(false);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="my-1 px-5 py-2 bg-neutral-900">
          <div className="flex justify-between">
            <div className="my-2 text-xl">@{post.user.username}</div>
            <div className="my-2 text-xs">
              {getTimeDifference(post.createdAt)}
            </div>
          </div>
          <div className="py-2">{post.content}</div>
          <div className="my-2 flex items-center">
            {/* Reply */}
            <button>🗨</button>
            {/* Retweet button */}
            <button>↺</button>
            {/* Like button */}
            <button>♡</button>
            {/* Share button */}
            <button>⇧</button>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => {
                  handleMoreOptionsClick();
                  setShowDropdown(!showDropdown);
                }}
              >
                ...
              </button>
              {showDropdown && isDropdownOpen && (
                <div
                  className="bg-purple-950 rounded-lg shadow-md absolute top-0 right-0 p-2"
                  style={{
                    marginTop: "-3.5rem",
                    marginRight: "-5rem",
                    width: "120px",
                  }}
                >
                  {/* Dropdown content (Delete and Favourite options) */}
                  <div href="#" className="px-1 hover:bg-purple-300">
                    Delete
                  </div>
                  <div href="#" className="px-1 hover:bg-purple-300">
                    Add to list
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
