import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <h1 className="text-9xl font-extrabold text-red-500 tracking-widest leading-none mb-4">404</h1>
            <div className="bg-red-500 text-white px-2 text-sm rounded rotate-12 absolute mb-20 origin-center">
                Page Not Found
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 drop-shadow-sm">
                Oops! You seem to be lost.
            </h2>
            <p className="text-gray-500 mb-8 max-w-md text-sm md:text-base">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/dashboard"
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
                Return to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
