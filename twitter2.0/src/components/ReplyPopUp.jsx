import { useEffect, useState } from "react";
import sendRequest from "../utilities/send-request";
import { usePopup } from "./PopupContext";
import { useNavigate, useParams } from "react-router";
import getTimeDifference from "./getTimeDiffernce";

export default function ReplyPopUp() {
  const { showPopup, setShowPopup } = usePopup();
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [tooLong, setTooLong] = useState(false);

  const { id } = useParams();
  const [post, setPost] = useState();

  async function getOnePost() {
    try {
      const postData = await sendRequest(`/api/posts/onePost/${id}`);
      console.log(postData);
      setPost(postData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOnePost();
  }, [id]);

  const handleInputChange = (event) => {
    setContent(event.target.value);
    setTooLong(false);
  };

  async function handleSubmit() {
    console.log("New post:", content);
    const contentWithUsername = `@${post?.user?.username} ${content}`;

    try {
      await sendRequest(`/api/posts/reply/${id}`, "POST", {
        content: contentWithUsername,
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
    navigate("/");
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-neutral-900 max-w-md w-3/4 h-1/2 relative rounded-2xl">
          <button
            className="absolute top-2 right-2 text-white text-2xl cursor-pointer px-4 py-2 rounded-full"
            onClick={closePopup}
          >
            &times;
          </button>
          <div className="p-5 items-start bg-neutral-800">
            <div className="flex justify-between  w-5/6">
              <div className="mr-2">@{post?.user?.username}</div>
              <div className="italic">{getTimeDifference(post?.createdAt)}</div>
            </div>
            <div className="mt-2">{post?.content}</div>
          </div>
          <textarea
            className="bg-neutral-900 p-10 pt-10 mb-4 w-full h-full resize-none rounded-2xl"
            style={{ outline: "none" }}
            placeholder={`reply to @${post?.user?.username}`}
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
    </>
  );
}
