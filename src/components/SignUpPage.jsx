import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { Mail, Lock, Apple, Chrome, X } from "lucide-react";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFirstPage, setIsFirstPage] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFirstPage) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true, timeout: 8000 }
      );

      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("Server is taking too long. Try again.");
      } else if (!err.response) {
        setError("Network error. Please check your internet.");
      } else {
        setError(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-base-200 via-base-300 to-base-200">
      <div className="w-full max-w-sm rounded-3xl bg-base-100 shadow-2xl p-8 animate-fade-in">
        {/* Logo */}
        <h2
          className="text-2xl font-semibold text-center text-primary"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          devTinder
        </h2>
        <p className="text-center text-sm text-base-content/60 mt-1 mb-6">
          Create an account to start matching with devs 💖
        </p>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-6">
          <div
            className={`h-2 w-8 rounded ${
              isFirstPage ? "bg-primary" : "bg-base-300"
            }`}
          />
          <div
            className={`h-2 w-8 rounded ${
              !isFirstPage ? "bg-primary" : "bg-base-300"
            }`}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isFirstPage ? (
            <>
              {/* First Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={loading}
                  className="input input-bordered rounded-xl w-full"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={loading}
                  className="input input-bordered rounded-xl w-full"
                  required
                />
              </div>

              <button
                type="button"
                disabled={!firstName || !lastName}
                onClick={() => setIsFirstPage(false)}
                className="btn btn-primary w-full h-12 rounded-xl text-base disabled:opacity-50"
              >
                Next
              </button>
            </>
          ) : (
            <>
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm">Email</span>
                </label>
                <div className="input input-bordered rounded-xl flex items-center gap-3">
                  <Mail size={18} className="text-base-content/50" />
                  <input
                    type="email"
                    placeholder="you@devmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="bg-transparent w-full outline-none"
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="bg-transparent w-full outline-none"
                    required
                  />
                </div>
                <p className="text-xs text-base-content/60 mt-1">
                  Min 8 chars, 1 uppercase, 1 number
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="alert alert-error rounded-xl text-sm flex justify-between items-center">
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

              {/* Actions */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full h-12 rounded-xl text-base"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>

              <button
                type="button"
                onClick={() => setIsFirstPage(true)}
                className="btn btn-ghost w-full"
              >
                ← Back
              </button>
            </>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-base-300" />
          <span className="text-xs px-3 text-base-content/60">
            or continue with
          </span>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {[Apple, Chrome, X].map((Icon, i) => (
            <button
              key={i}
              disabled={loading}
              className="btn rounded-xl bg-base-200 border-base-300 hover:bg-base-300"
            >
              <Icon size={20} />
            </button>
          ))}
        </div>

        {/* Login */}
        <p className="text-center text-sm mt-6 text-base-content/60">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-secondary hover:text-primary font-semibold cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
