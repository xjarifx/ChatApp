import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const AuthPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        {/* Slack Logo Area */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 bg-[#e01e5a] rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1d1c1d] mb-2">
            {isSignIn ? "Sign in to ChatApp" : "First, enter your email"}
          </h1>
          <p className="text-[#616061] text-sm">
            {isSignIn
              ? "We suggest using the email address you use at work."
              : "We suggest using the email address you use at work."}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {!isSignIn && (
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-[#1d1c1d] mb-2 block"
              >
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3 py-3 text-base border border-[#d1d2d3] rounded-md focus:border-[#1264a3] focus:ring-2 focus:ring-[#1264a3]/20 focus:outline-none bg-white text-[#1d1c1d] placeholder-[#616061]"
              />
            </div>
          )}

          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-[#1d1c1d] mb-2 block"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@work-email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3 py-3 text-base border border-[#d1d2d3] rounded-md focus:border-[#1264a3] focus:ring-2 focus:ring-[#1264a3]/20 focus:outline-none bg-white text-[#1d1c1d] placeholder-[#616061]"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="text-sm font-medium text-[#1d1c1d] mb-2 block"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3 py-3 text-base border border-[#d1d2d3] rounded-md focus:border-[#1264a3] focus:ring-2 focus:ring-[#1264a3]/20 focus:outline-none bg-white text-[#1d1c1d] placeholder-[#616061]"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-[#4a154b] hover:bg-[#350d33] text-white font-semibold rounded-md transition-colors text-base"
          >
            {isSignIn ? "Sign In with Email" : "Continue"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d1d2d3]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#616061]">OR</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full h-11 bg-white border border-[#dadce0] hover:bg-[#f8f9fa] hover:border-[#d2e3fc] hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] text-[#3c4043] font-medium rounded-md transition-all text-base flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-1"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-[#3c4043] font-medium">
              Continue with Google
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-[#d1d2d3]">
          <span className="text-sm text-[#616061]">
            {isSignIn ? "New to ChatApp?" : "Already using ChatApp?"}
          </span>
          <button
            type="button"
            className="ml-2 text-sm text-[#1264a3] hover:underline font-medium"
            onClick={() => setIsSignIn((s) => !s)}
          >
            {isSignIn ? "Create an account" : "Sign in to your account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
