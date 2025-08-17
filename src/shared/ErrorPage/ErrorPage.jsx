import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center   px-4">
            <div className="  p-10 rounded-xl shadow-lg max-w-md text-center">
                <div className="text-red-600 mb-6">
                    {/* Simple error icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-24 w-24"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold mb-4 text-gray-800">
                    Oops! Something went wrong.
                </h1>
                <p className="  mb-6">
                    Sorry, we couldn&apos;t find what you were looking for or an
                    unexpected error occurred.
                </p>

                <Link
                    to="/"
                    className="px-6 py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
                >
                    Back Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
