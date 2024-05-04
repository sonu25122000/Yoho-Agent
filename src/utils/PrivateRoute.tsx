import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const IsLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  useEffect(() => {
    if (!IsLoggedIn) {
      toast.error("Please Login First.");
      navigate("/auth/sign-in");
    }
  }, [navigate, IsLoggedIn]); // Dependency array ensures this effect runs only when navigate or token changes

  return <div>{children}</div>;
}

export default PrivateRoute;
