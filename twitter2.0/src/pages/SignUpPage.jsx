import { useState } from "react";
import SignUpForm from "../components/SignUpForm";

export default function SignUpPage() {
  const [user, setUser] = useState(null);

  return <SignUpForm />;
}
