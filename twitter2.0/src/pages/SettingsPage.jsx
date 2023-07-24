import { Link } from "react-router-dom";

export default function SettingsPage() {
  return (
    <>
      <h1 className="p-5">Settings</h1>
      <div className="p-5">
        <Link to="/settings/changeusername">
          <div className="my-3">Change username</div>
        </Link>
        <Link to="/settings/edituser">
          <div className="my-3">Edit account details</div>
        </Link>
        <Link to="/settings/changepassword">
          <div className="my-3">Change password</div>
        </Link>
        <Link to="/settings/privacy">
          <div className="my-3">Privacy settings</div>
        </Link>
      </div>
    </>
  );
}
