import { useState } from "react";
import sendRequest from "../utilities/send-request";
import { usePopup } from "./PopupContext";
import { useNavigate } from "react-router";

export default function ReplyPopUp() {
  const { showPopup, setShowPopup } = usePopup();
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [tooLong, setTooLong] = useState(false);

  const handleInputChange = (event) => {
    setContent(event.target.value);
    setTooLong(false);
  };

  async function handleSubmit() {
    // Perform any actions you want to do with the new post, e.g., post to a server.
    console.log("New post:", content);
    try {
      await sendRequest(`/api/posts/newpost`, "POST", {
        content: content,
      });
      setContent("");
      setTooLong(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setTooLong(true);
    }
  }

  // Close the popup after submitting the new post.
  const closePopup = () => {
    setShowPopup(false);
    navigate("/");
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
              {tooLong && (
                <div className="text-red-500 mt-2 mr-5">Post is too long</div>
              )}
              <div
                className={`text-right mt-2 mr-5 ${
                  content.length > 280 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {content.length}
              </div>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSubmit}
              >
                Spill!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
