import React, { useState } from "react";

export default function Login({ onToggle, onSubmitSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    // Aapka backend login API integration yahan aayega
    if (onSubmitSuccess) onSubmitSuccess(formData);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-zinc-100 mb-6 text-center">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="superman@example.com"
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-zinc-200 placeholder-zinc-600 outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-zinc-200 placeholder-zinc-600 outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 rounded-lg bg-emerald-600 py-3 font-semibold text-white shadow-lg hover:bg-emerald-500 active:scale-[0.98] transition-all outline-none"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Don't have an account?{" "}
        <button onClick={onToggle} className="text-emerald-400 hover:underline font-medium outline-none">
          Sign up here
        </button>
      </p>
    </div>
  );
}