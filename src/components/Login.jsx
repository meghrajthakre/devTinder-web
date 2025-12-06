import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { Mail, Lock, Apple, Chrome, X } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("meghraj@123gmail.com");
  const [password, setPassword] = useState("Meghraj@123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="relative bg-base-200 min-h-[calc(100vh-64px)] flex items-start justify-center pt-16 px-4">
      <img src="" alt="" />

      {/* Login Card */}
      <div className="w-full max-w-sm border border-base-300 shadow-xl rounded-2xl p-8 transition-all z-10">

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-1 text-base-content">
          Welcome Back
        </h2>

        <p className="text-center text-sm mb-8 text-base-content/60">
          Don't have an account yet?{" "}
          <span className="text-primary cursor-pointer">Sign up</span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-base-content">Email</span>
            </label>
            <div className="input input-bordered flex items-center gap-3 rounded-md">
              <Mail size={18} className="text-base-content/50" />
              <input
                type="email"
                className="bg-transparent w-full outline-none text-base-content"
                placeholder="email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-base-content">Password</span>
            </label>
            <div className="input input-bordered flex items-center gap-3 rounded-md">
              <Lock size={18} className="text-base-content/50" />
              <input
                type="password"
                className="bg-transparent w-full outline-none text-base-content"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="4"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 text-red-600 border border-red-300 rounded-md p-3 mb-4 animate-fadeIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 3h.01M12 3.75l8.25 14.25H3.75L12 3.75z"
                />
              </svg>
              <span className="flex-1 text-sm">{error}</span>
              <button
                onClick={() => setError("")}
                className="text-red-500 hover:text-red-700 transition"
              >
                ✕
              </button>
            </div>
          )}

          {/* Login Btn */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full rounded-md h-12 text-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* OR */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-base-300"></div>
          <span className="text-base-content/60 text-sm px-3">OR</span>
          <div className="flex-1 h-px bg-base-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button className="btn bg-base-200 border-base-300 rounded-xl hover:bg-base-300">
            <Apple size={20} />
          </button>
          <button className="btn bg-base-200 border-base-300 rounded-xl hover:bg-base-300">
            <Chrome size={20} />
          </button>
          <button className="btn bg-base-200 border-base-300 rounded-xl hover:bg-base-300">
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
