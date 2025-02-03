"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, Loader2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login, signup } from "../actions";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("signin");
  const router = useRouter();

  const handleAuth = async (type) => {
    try {
      setLoading(true);
      setMessage("");

      const response = await (type === "signin" ? login : signup)({
        username,
        password,
        email,
      });

      if (response.error) {
        setMessage(response.error);
        return;
      }

      setMessage(
        type === "signin"
          ? "Signed in successfully!"
          : "Check your email for confirmation!"
      );

      if (type === "signin") {
        router.push("/tracker");
      }
    } catch (error) {
      setMessage(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full h-fit grid-cols-2 mb-10">
        <TabsTrigger value="signin" className="text-base py-3">
          Sign In
        </TabsTrigger>
        <TabsTrigger value="signup" className="text-base py-3">
          Sign Up
        </TabsTrigger>
      </TabsList>

      {message && (
        <Alert
          className="mb-8"
          variant={
            message.includes("error") || message.includes("Error")
              ? "destructive"
              : "default"
          }
        >
          <AlertDescription className="text-base">{message}</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth(activeTab);
        }}
        className="space-y-6"
      >
        {activeTab === "signup" && (
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter your username"
                className="pl-12 py-6 text-base"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={activeTab === "signup"}
              />
            </div>
          </div>
        )}
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="name@example.com"
              className="pl-12 py-6 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              placeholder="Enter your password"
              className="pl-12 py-6 text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </div>
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full py-6 text-base"
            size="lg"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-3 h-5 w-5 animate-spin" />}
            {loading
              ? "Please wait..."
              : activeTab === "signin"
              ? "Sign In"
              : "Create Account"}
          </Button>
        </div>
      </form>
    </Tabs>
  );
}
