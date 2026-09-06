import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed or use fetch

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Ping your backend verification route (include credentials so cookies are sent)
        await axios.get("http://localhost:3000/api/auth/verify-token", {
          withCredentials: true, 
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  // Show a loading spinner or blank screen while verifying
  if (isAuthenticated === null) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary me-2"></div> Checking authentication...
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child route component
  return <Outlet />;
}