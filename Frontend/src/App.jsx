import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Body from "./pages/Body";
import Contact from "./pages/Contact";
import Upload from "./pages/Upload";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import Dashboard from "./pages/Dashboard";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL = "http://cerviscan.tech/api";

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(user?.name && user?.emailId);
  const hasAccess = allowedRoles ? allowedRoles.includes(user?.role) : true;
  const currentPath = window.location.pathname;

  useEffect(() => {

    if (!isAuthenticated) {
      if (currentPath === "/login") return; // ✅ Prevent redirect loop on logout
      toast.error("Unauthorized access! Please log in.");
      navigate("/login", { replace: true });
    } else if (!hasAccess) {
      toast.error("Unauthorized access!");
      navigate("/", { replace: true });
    }

  }, [isAuthenticated, hasAccess]);

  if (!isAuthenticated || !hasAccess) return null;

  return children;
};


const App = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Pass user to ProtectedRoute */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute user={user}>
              <Upload />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

// ✅ Wrapper Component for Fetching User (Fixed)
const AppWrapper = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (userData.name && userData.emailId && userData.role) {
        setLoading(false);
        return;
      }

      const token = Cookies.get("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`/user/user`, {
          withCredentials: true,
        });

        if (res.data?.fullName && res.data?.email && res.data?.role) {
          dispatch(
            addUser({
              name: res.data.fullName,
              emailId: res.data.email,
              role: res.data.role,
            })
          );
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        if (err.response?.status === 401) {
          toast.error("Session expired! Please log in again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, userData]);

  if (loading) return <p>Loading...</p>;

  return <App user={userData} />;
};

// ✅ Wrap App with BrowserRouter
const Root = () => (
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);

export default Root;
