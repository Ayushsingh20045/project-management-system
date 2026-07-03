import { motion } from "framer-motion";
import { Home, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl sm:p-12"
            >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
                    <TriangleAlert
                        size={50}
                        className="text-red-500"
                    />
                </div>

                <h1 className="mt-8 text-6xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-bold text-slate-800">
                    Page Not Found
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                    The page you're looking for doesn't exist,
                    has been moved, or the URL may be incorrect.
                </p>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
                >
                    <Home size={20} />
                    Back to Dashboard
                </button>
            </motion.div>
        </div>
    );
};

export default NotFound;