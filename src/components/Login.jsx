import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        
        
    }
    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4">
            <div className="card bg-base-200/60 backdrop-blur-md shadow-xl w-96 p-6 rounded-2xl border border-base-300/40">
                <div className="card-body">

                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-6 text-center">
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
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full rounded-lg bg-base-100 focus:ring-2 focus:ring-primary/60"
                            minLength="4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Button */}
                    <button onClick={handleSubmit} className="btn btn-primary w-full rounded-lg text-lg h-12">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
