import React, { useState } from "react";
import { Link } from "react-router-dom";
import sendRequest from "../utilities/send-request";

export default function NewPostPopUp({ showPopup, setShowPopup }) {
  const [content, setContent] = useState("");

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };
  async function handleSubmit() {
    // Perform any actions you want to do with the new post, e.g., post to a server.
    console.log("New post:", content);
    try {
      await sendRequest(`/api/posts/newpost`, "POST", {
        content: content,
      });
      setShowPopup(false);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }
  // Close the popup after submitting the new post.

  return (
    <>
      {/* Popup container */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {/* Popup content */}
          <div className="bg-neutral-900 max-w-md w-3/4 h-1/2 relative rounded-2xl">
            <button
              className="absolute top-2 left-2 text-white text-2xl cursor-pointer px-4 py-2 rounded-full"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <textarea
              className="bg-neutral-900 p-10 pt-16 mb-4 w-full h-full resize-none  rounded-2xl"
              style={{ outline: "none" }}
              placeholder="What are you thinking about?"
              value={content}
              onChange={handleInputChange}
            />
            {/* "Fish" button added here */}
            <div className="flex justify-end">
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSubmit}
              >
                Fish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
