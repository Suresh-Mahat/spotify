import React, { useState } from "react";

export default function Signup({ onToggle, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "listener",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Final Object
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    // Print Object in Console
    console.log("Signup User Data:", userData);

    // Optional Parent Callback
    onSubmitSuccess?.(userData);

    // Clear Form After Submit
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "listener",
    });
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-zinc-100 mb-2 text-center">
        Create Account
      </h2>

      <p className="text-zinc-500 text-center mb-8">
        Join the platform and start your journey 🎵
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-zinc-200 placeholder-zinc-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-zinc-200 placeholder-zinc-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-zinc-200 placeholder-zinc-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Join As
          </label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-zinc-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
          >
            <option value="listener">
              Listener (Enjoy Music)
            </option>

            <option value="artist">
              Artist (Upload Songs)
            </option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white shadow-lg hover:bg-emerald-500 active:scale-[0.98] transition-all"
        >
          Create Account
        </button>
      </form>

      {/* Toggle Login */}
      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        
        <button
          onClick={onToggle}
          className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-all"
        >
          Log in here
        </button>
      </p>
    </div>
  );
}