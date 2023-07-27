import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

export default function ProfileCard({ profiles, users, isFollowing }) {
  return (
    <>
      {profiles.map((profile, index) => (
        <div key={index} className="my-2 bg-neutral-950">
          <div className="flex justify-between items-center">
            <div>{profile.displayname}</div>
            <div>
              {isFollowing && (
                <FollowButton
                  isFollowing={isFollowing}
                  username={users[index].username}
                />
              )}
            </div>
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
