import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children }) {
  // If user is NOT logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected content
  return children;
}
