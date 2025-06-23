import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
