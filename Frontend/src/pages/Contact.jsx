import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ContactPage() {
    return (
        <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-12 px-6">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-lg shadow-xl rounded-xl p-10 border border-gray-700">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold text-white">Contact Us</CardTitle>
                    <p className="text-gray-400 mt-2">We're here to help! Reach out to us anytime.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg shadow-md">
                            <Mail className="text-blue-400" />
                            <span className="text-gray-300">support@cervicalhealth.com</span>
                        </div>
                        <div className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg shadow-md">
                            <Phone className="text-green-400" />
                            <span className="text-gray-300">+1 234 567 890</span>
                        </div>
                        <div className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg shadow-md col-span-2">
                            <MapPin className="text-red-400" />
                            <span className="text-gray-300">123 Health St, Wellness City, USA</span>
                        </div>
                    </motion.div>
                    <motion.form variants={fadeIn} className="space-y-4">
                        <Input className="bg-gray-800 border border-gray-600 text-white" placeholder="Your Name" required />
                        <Input className="bg-gray-800 border border-gray-600 text-white" type="email" placeholder="Your Email" required />
                        <Textarea className="bg-gray-800 border border-gray-600 text-white" placeholder="Your Message" rows={4} required />
                        <Button className="w-full bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
                            Send Message
                        </Button>
                    </motion.form>
                </CardContent>
            </motion.div>
        </div>
    );
}