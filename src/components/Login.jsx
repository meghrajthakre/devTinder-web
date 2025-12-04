import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState('meghraj@123gmail.com');
    const [password, setPassword] = useState('Meghraj@123');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await axios.post(
                BASE_URL + "/login",
                { email, password },
                { withCredentials: true }
            );
            console.log("LOGIN SUCCESS:", res.data);
            setEmail("")
            setPassword("")
            setLoading(false);
            dispatch(addUser(res.data));
            navigate('/feed')
        } catch (err) {
            console.log("LOGIN ERROR:", err);
        }
    };

    return (
        <div className="h-full mt-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="card  w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl ">
                <form onSubmit={handleSubmit} className="card-body p-0">

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                        Login
                    </h2>

                    {/* Email */}
                    <div className="form-control w-full mb-5">
                        <label className="label mb-1">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="mail@site.com"
                            className="input input-bordered w-full rounded-lg bg-base-100 focus:ring-2 focus:ring-primary/60"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-control w-full mb-7">
                        <label className="label mb-1">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full rounded-lg bg-base-100 focus:ring-2 focus:ring-primary/60"
                            minLength="4"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full rounded-lg text-lg h-12"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
