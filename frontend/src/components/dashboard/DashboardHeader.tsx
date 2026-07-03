import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";

const DashboardHeader = () => {
    const user = useAuthStore((state) => state.user);

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-xl"
        >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/5" />

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <h1 className="text-4xl font-bold">
                        {greeting},{" "}
                        {user?.name?.split(" ")[0] ?? "User"} 👋
                    </h1>

                    <p className="mt-3 max-w-2xl text-blue-100">
                        Welcome back! Here's a quick overview of
                        everything happening across your projects.
                    </p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-6 py-4 backdrop-blur">
                    <CalendarDays size={22} />

                    <div>
                        <p className="text-sm text-blue-100">
                            Today
                        </p>

                        <h3 className="font-semibold">
                            {today}
                        </h3>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default DashboardHeader;