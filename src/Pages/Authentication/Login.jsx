import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
    const { logInUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        console.log(data);
        logInUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                navigate(from, { replace: true });
                toast('Login successfully!');
            })
            .catch((error) => {
                console.log(error);
            })
        
    };

    return (
        <div
            className=" bg-white shadow-lg rounded-xl p-8 mt-12"
            data-aos="fade-up"
        >
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                🔐 Login
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Email is required',
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        className="input input-bordered w-full"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 cursor-pointer text-sm text-gray-500"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </span>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <p>
                    <span className="text-xs">Are you new here?</span>{' '}
                    <span className="text-primary hover:link text-sm">
                        <Link to="/register">Register</Link>
                    </span>
                </p>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary text-secondary w-full"
                >
                    Login
                </button>
                <SocialLogin />
            </form>
        </div>
    );
};

export default Login;
