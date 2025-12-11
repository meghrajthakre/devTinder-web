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

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        {
          withCredentials: true,
          timeout: 8000,
        }
      );

      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("Server is taking too long. Try again.");
      } else if (!err.response) {
        setError("Network error. Please check your internet.");
      } else if (err.response.status === 401) {
        setError("Invalid email or password");
      } else if (err.response.status >= 500) {
        setError("Server error. Please try later.");
      } else {
        setError(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-gradient-to-br from-base-200 via-base-300 to-base-200
      "
    >
      <div
        className="
          w-full max-w-sm rounded-3xl 
          bg-base-100 shadow-2xl 
          p-8
        "
      >
        {/* Brand */}
        <h2
          className="text-2xl font-semibold text-center text-primary"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          devTinder
        </h2>

        <p className="text-center text-sm text-base-content/60 mt-1 mb-8">
          Sign in to continue matching with devs 💖
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Email</span>
            </label>
            <div className="input input-bordered rounded-xl flex items-center gap-3">
              <Mail size={18} className="text-base-content/50" />
              <input
                type="email"
                disabled={loading}
                className="bg-transparent w-full outline-none"
                placeholder="you@devmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Password</span>
            </label>
            <div className="input input-bordered rounded-xl flex items-center gap-3">
              <Lock size={18} className="text-base-content/50" />
              <input
                type="password"
                disabled={loading}
                className="bg-transparent w-full outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                required
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-error flex justify-between items-center rounded-xl text-sm shadow-sm">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setError("")}
                className="btn btn-ghost btn-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full h-12 rounded-xl text-base"
          >
            {loading ? "Signing you in..." : "Continue"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-base-300" />
          <span className="text-xs px-3 text-base-content/60">
            or continue with
          </span>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-3 gap-3">
          {[Apple, Chrome, X].map((Icon, i) => (
            <button
              key={i}
              disabled={loading}
              className="
                btn rounded-xl 
                bg-base-200 border-base-300
                hover:bg-base-300
              "
            >
              <Icon size={20} />
            </button>
          ))}
        </div>

        {/* Signup */}
        <p className="text-center text-sm mt-6 text-base-content/60">
          New here?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-secondary hover:text-primary font-semibold cursor-pointer"
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
