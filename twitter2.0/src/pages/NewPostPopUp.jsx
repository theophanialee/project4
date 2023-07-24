import { useState } from "react";
import sendRequest from "../utilities/send-request";
import { usePopup } from "../components/PopupContext";

export default function NewPostPopUp() {
  const { showPopup, setShowPopup } = usePopup();
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
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closePopup}
          ></div>
          {/* Popup content */}
          <div className="bg-neutral-900 max-w-md w-3/4 h-1/2 relative rounded-2xl">
            <button
              className="absolute top-2 right-2 text-white text-2xl cursor-pointer px-4 py-2 rounded-full"
              onClick={closePopup}
            >
              &times;
            </button>
            <textarea
              className="bg-neutral-900 p-10 pt-16 mb-4 w-full h-full resize-none rounded-2xl"
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
