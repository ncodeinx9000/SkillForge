import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import api from "../lib/axios";
import { loginSuccess, logout } from "../redux/userSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me");

        if (response.data.success) {
          dispatch(loginSuccess(response.data.user));
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return children;
};

export default AuthInitializer;