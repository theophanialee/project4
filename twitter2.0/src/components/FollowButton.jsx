import "./form.css";

export default function FollowButton({ user, username }) {
  function handleFollow() {
    console.log(
      `Logged in user ${user.username} wants to follow profile user ${username}`
    );
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
