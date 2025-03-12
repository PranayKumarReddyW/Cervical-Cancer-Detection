import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaBrain, FaShieldAlt, FaClock, FaUserCheck, FaBolt, FaChartLine } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function HomePage() {
    const user = useSelector((state) => state.user);
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(user?.name && user?.emailId));

    useEffect(() => {
        setIsAuthenticated(Boolean(user?.name && user?.emailId));
    }, [user]);
    const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center py-16 px-8 space-y-20">
            {/* Hero Section */}
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center max-w-3xl">
                <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                    Cervical Health AI
                </h1>
                <p className="text-lg text-gray-300 mt-5 leading-relaxed max-w-2xl mx-auto">
                    Empowering early detection with AI-driven cervical cancer classification. Fast, accurate, and secure.
                    Get real-time insights and take proactive steps for a healthier future.
                </p>
                {isAuthenticated ?
                    ""
                    :
                    <Button Button
                        onClick={() => navigate("/login")}
                        className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-4 text-lg rounded-xl shadow-xl transition-transform transform hover:scale-105">
                        Get Started
                    </Button>
                }
            </motion.div>

            {/* Features Section */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl" initial="hidden" animate="visible" variants={fadeInUp}>
                {[
                    { title: "AI Precision", icon: <FaBrain />, desc: "Cutting-edge deep learning models ensure accurate and early cervical cancer detection." },
                    { title: "Real-time Insights", icon: <FaChartLine />, desc: "Get instant results backed by medical research and AI-driven analytics." },
                    { title: "Privacy First", icon: <FaShieldAlt />, desc: "Your data is encrypted and stored securely, ensuring complete confidentiality." },
                    { title: "User-Friendly", icon: <FaUserCheck />, desc: "Simple and intuitive design allows easy navigation for all users." },
                    { title: "Rapid Diagnosis", icon: <FaBolt />, desc: "Quick and efficient processing for faster results, reducing waiting time." },
                    { title: "24/7 Accessibility", icon: <FaClock />, desc: "Access our AI-powered platform anytime, anywhere, for continuous health monitoring." }
                ].map((feature, index) => (
                    <Card key={index} className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-shadow flex flex-col items-center text-center">
                        <div className="text-4xl text-cyan-400 mb-4">{feature.icon}</div>
                        <CardContent>
                            <h2 className="text-2xl font-semibold text-cyan-400">{feature.title}</h2>
                            <p className="text-gray-300 mt-3 text-sm leading-relaxed">{feature.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>
        </div >
    );
}