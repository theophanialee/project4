import { Link } from "react-router-dom";

export default function FollowProfileCard({ profiles, users }) {
  return (
    <>
      {profiles.map((profile, index) => (
        <div key={index} className="my-2 bg-neutral-950">
          <Link to={`/profile/${users[index].username}`}>
            <div>
              {profile.displayname}
              <div> @{users[index].username}</div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
