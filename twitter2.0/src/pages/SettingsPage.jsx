import { Link } from "react-router-dom";

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <Link to="/settings/changeusername">
        <div>Change username</div>
      </Link>
      <Link to="/settings/edituser">
        <div>Edit account details</div>
      </Link>
      <Link to="/settings/changepassword">
        <div>Change password</div>
      </Link>
      <Link to="/settings/privacy">
        <div>Privacy settings</div>
      </Link>
    </div>
  );
}
