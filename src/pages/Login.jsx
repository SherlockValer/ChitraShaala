import Logo from "../components/common/Logo";
import logoImg from "../assets/kavioPix_logo.png";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const handleGoogleSignIn = async () => {
    try {
      window.location.href = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/v1/auth/google`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
          <div className="mb-6">
            <img
              src={logoImg}
              alt="ChitraShaala Logo"
              className="h-16 mx-auto mb-4 rounded-full shadow-lg cursor-pointer"
            />
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to <Logo />
            </h1>
            <p className="mt-3 text-gray-500">
              Your memories, captured like poetry. <br />
            </p>
            <p className="mt-6 text-sm">
              Login to revisit your moments of joy, wonder, and light.
            </p>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 hover:shadow-md transition px-6 py-2 rounded-full w-full font-medium cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
