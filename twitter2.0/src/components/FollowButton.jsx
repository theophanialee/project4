import sendRequest from "../utilities/send-request";
import "./form.css";

export default function FollowButton({ user, username }) {
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
    }
  }

  return (
    <>
      {" "}
      <button
        className="bg-purple-600 rounded-full py-1 px-3 m-1 text-white"
        onClick={handleFollow}
      >
        Follow
      </button>
    </>
  );
}
