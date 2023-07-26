import { Link } from "react-router-dom";

export default function ProfileCard({ profiles, users, following }) {
  return (
    <>
      {profiles.map((profile, index) => (
        <div key={index} className="my-2 bg-neutral-950">
          <Link to={`/profile/${users[index].username}`}>
            <div className="flex justify-between items-center">
              <div>{profile.displayname}</div>
              <div>
                {following && (
                  <button className="bg-purple-950 text-white rounded-md px-2 py-1">
                    Following
                  </button>
                )}
              </div>
            </div>
            <div>@{users[index].username}</div>
            <div>{profile.bio}</div>
          </Link>
        </div>
      ))}
    </>
  );
}
