import { useState } from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const [user, setUser] = useState(null);

  return (
    <div className="loginForm">
      <LoginForm />
    </div>
  );
}
