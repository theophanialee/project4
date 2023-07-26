import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [user, setUser] = useState(null);

  return (
    <>
      <SignUpForm />
      <div className="fixed bottom-0 right-0 w-1/2 h-1/8 pb-5 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-400">
          Log in!
        </Link>
      </div>
    </>
  );
}
