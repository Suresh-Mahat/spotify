import React, { useState } from "react";
import Login from "../components/auth/login";
import Signup from "../components/auth/register";


export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-100">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-xl border border-zinc-800 transition-all duration-300">
        
        {/* Top Tab Switcher */}
        <div className="flex border-b border-zinc-800 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 pb-3 text-lg font-medium transition-all ${
              isLogin ? "border-b-2 border-emerald-500 text-emerald-400" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 pb-3 text-lg font-medium transition-all ${
              !isLogin ? "border-b-2 border-emerald-500 text-emerald-400" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Dynamic Component Rendering based on State */}
        {isLogin ? (
          <Login  />
        ) : (
          <Signup  />
        )}

      </div>
    </div>
  );
}