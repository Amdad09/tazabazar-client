import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router';
import { saveUserInDb } from '../../assets/api/utils';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';

const Register = () => {
    const { createUser, updateUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [terms, setTerms] = useState(false);
    const from = location?.state?.from?.pathname || '/';
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        console.log(data);

        createUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                const userData = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    photo: result?.user?.photoURL,
                };
                saveUserInDb(userData);
                
                toast.success('Rgistration successfully!');
                reset();
                const profile = {
                    displayName: data.name,
                    photoURL: data.photo,
                };
                console.log(profile);
                updateUser(profile)
                    .then(() => {
                        console.log('Profile updated');
                        navigate(from, { replace: true });
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message || 'Something is wrong!!');
            });
    };

    return (
        <div
            className=" bg-white shadow-lg rounded-xl p-8 mt-12"
            data-aos="fade-up"
        >
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                📝 Register
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        {...register('name', { required: 'Name is required' })}
                        className="input input-bordered w-full"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email */}
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

                {/* Photo URL */}
                <div>
                    <input
                        type="url"
                        placeholder="Photo URL"
                        {...register('photo', {
                            required: 'Photo URL is required',
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.photo && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.photo.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message:
                                    'Password must be 6 character or longer',
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                message:
                                    'Password must contain at least one uppercase and one lowercase letter',
                            },
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {' '}
                            {errors.password.message}
                        </p>
                    )}

                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 cursor-pointer text-sm text-gray-500"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </span>
                </div>
                <p>
                    <span></span>
                </p>
                <label className="label text-sm text-secondary">
                    <input
                        type="checkbox"
                        {...register('terms', {
                            required: 'You must accept the terms',
                        })}
                        className="checkbox"
                    />
                    <label className="text-sm text-secondary">
                        I accept the Terms and Conditions
                    </label>
                </label>
                {errors.terms && (
                    <p className="text-red-500 text-sm mt-1">
                        {' '}
                        {errors.terms.message}
                    </p>
                )}
                <p>
                    <span className="text-xs">
                        Do you have already account?
                    </span>{' '}
                    <span className="text-primary hover:link text-sm">
                        <Link to="/login">Login</Link>
                    </span>
                </p>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary text-secondary w-full"
                >
                    Create Account
                </button>
                <SocialLogin />
            </form>
        </div>
    );
};

export default Register;
