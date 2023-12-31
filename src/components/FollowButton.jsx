import { useContext, useState } from "react";
import sendRequest from "../utilities/send-request";
import "./form.css";
import { UserContext } from "../pages/App/App";

export default function FollowButton({ username, isFollowing }) {
  const { user } = useContext(UserContext);
  console.log("logged in", user);
  const [popUp, setPopUp] = useState(false);
  console.log(isFollowing);

  async function handleFollow() {
    console.log(
      `Logged in user ${user.username} wants to follow profile user ${username}`
    );
    try {
      const response = await sendRequest(
        `/api/relationships/createFollower`,
        "POST",
        { following: username }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      setPopUp(true);
    }
  }

  async function handleUnfollow() {
    const response = await sendRequest(
      `/api/relationships/deleteFollower`,
      "DELETE",
      { following: username }
    );
    setPopUp(false);
    window.location.reload();
  }

  const handleClose = () => {
    setPopUp(false);
  };

  return (
    <>
      {isFollowing ? (
        <button
          className="bg-purple-950 rounded-full py-1 px-3 m-1 text-white"
          onClick={handleFollow}
        >
          Following
        </button>
      ) : (
        <button
          className="bg-purple-600 rounded-full py-1 px-3 m-1 text-white"
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
      {popUp && (
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-opacity-70 bg-gray-900">
          <div className="bg-neutral-950 p-4 rounded shadow">
            <div className="text-center">Confirm unfollow?</div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-purple-950 rounded py-1 px-3 m-1 text-white"
                onClick={handleUnfollow}
              >
                Unfollow
              </button>
              <button
                className="bg-gray-700 rounded py-1 px-3 m-1 text-white"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
