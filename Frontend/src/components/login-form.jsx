import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice";
import axios from "axios"

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const BASE_URL = import.meta.env.VITE_API_BASE_URI
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`,
        { email, password }, // Sending credentials in request body
        { withCredentials: true } // Ensuring cookies are sent/received
      );

      // Extract response data
      const data = response.data;

      // Handle success
      toast.success("Login successful!");
      console.log(data);

      // Dispatch addUser to update Redux state & localStorage
      dispatch(addUser({ name: data.user.fullName, emailId: data.user.email, id: data.user.id }));

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.error || "Something went wrong. Please try again later.");
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="email"
                  value={email}
                  placeholder="Enter email id"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
