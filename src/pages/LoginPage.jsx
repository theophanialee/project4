import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {

  return (
    <>
      <div className="fixed top-0 right-0 w-1/2 h-3/4 text-center">
        <LoginForm />
        <div className="fixed bottom-0 right-0 w-1/2 h-1/4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400">
            Sign Up!
          </Link>
          <div>
            <Link to="/resetPw">Forgot password?</Link>
          </div>
        </div>
      </div>
    </>
  );
}
