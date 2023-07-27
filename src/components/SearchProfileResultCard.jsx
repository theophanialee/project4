import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

export default function SearchProfileResultCard({ profiles, users }) {
  return (
    <>
      {profiles.map((profile, index) => (
        <div key={index} className="my-2 bg-neutral-950">
          <div className="flex justify-between items-center">
            <div>{profile.displayname}</div>
          </div>
          <Link to={`/profile/${users[index].username}`}>
            <div>@{users[index].username}</div>
            <div>{profile.bio}</div>
          </Link>
        </div>
      ))}
    </>
  );
}
