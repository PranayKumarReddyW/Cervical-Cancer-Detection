import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(user?.name && user?.emailId));

    useEffect(() => {
        setIsAuthenticated(Boolean(user?.name && user?.emailId));
    }, [user]);
    const BASE_URL = import.meta.env.VITE_API_BASE_URI;

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/user/logout", {}, {
                withCredentials: true,
            });

            dispatch(removeUser());  // ✅ Ensure Redux state is updated before navigation
            Cookies.remove("token");  // ✅ Ensure token is removed
            toast.success("Logged out successfully!");
            navigate("/login", { replace: true });  // ✅ Use `replace: true` to prevent back navigation
        } catch (error) {
            console.log(error);
            toast.error("Error logging out!");
        }
    };


    return isAuthenticated ? (
        <nav className="bg-gray-900 text-white py-4 px-6 shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="text-xl font-semibold">Cervical Health AI</div>
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-gray-400">Home</Link>
                    <Link to="/about" className="hover:text-gray-400">About</Link>
                    <Link to="/contact" className="hover:text-gray-400">Contact</Link>
                    <Link to="/upload" className="hover:text-gray-400">Upload</Link>
                    <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
                </div>
            </div>
        </nav>
    ) : null;
}
