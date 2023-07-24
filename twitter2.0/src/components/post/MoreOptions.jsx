import { useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useNavigate } from "react-router";

export default function MoreOptions({ post }) {
  const [showDropdown, setShowDropdown] = useState(false); // State for "More Options" dropdown
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for tracking the dropdown visibility
  const navigate = useNavigate();

  const handleMoreOptionsClick = () => {
    setShowDropdown(false);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  async function handleDelete() {
    console.log(post._id);
    try {
      // Make the delete request to the backend
      await sendRequest(`/api/posts/delete/${post._id}`, "DELETE");
      // Optionally, you can update the UI to reflect the deleted post
      console.log("Post deleted successfully");
      navigate("/profile");
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  }

  return (
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
            marginTop: "-2.5rem",
            marginRight: "0rem",
            width: "90px",
          }}
        >
          {/* Dropdown content (Delete and Favourite options) */}
          <div
            href="#"
            className="px-1 hover:bg-purple-300"
            onClick={handleDelete}
          >
            Delete
          </div>
          <div href="#" className="px-1 hover:bg-purple-300">
            Add to list
          </div>
        </div>
      )}
    </div>
  );
}
