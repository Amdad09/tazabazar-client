import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router';
import { saveUserInDb } from '../../assets/api/utils';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';
import axios from 'axios';

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
        logInUser(data.email, data.password)
            .then(async (result) => {
                const user = result.user;

                const userData = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                };

                await saveUserInDb(userData); 

                
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/jwt`,
                    {
                        email: user?.email,
                    },
                );

                const token = res.data.token;
                console.log(token)
                localStorage.setItem('access-token', token);
                console.log(localStorage.getItem('access-token'));

                
                navigate(from, { replace: true });
                toast.success('Login successfully!');
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    };


    return (
        <div
            className="bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10 max-w-md w-full mx-auto mt-12"
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
            </form>
            <SocialLogin />
        </div>
    );
};

export default Login;
