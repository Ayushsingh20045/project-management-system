import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    value: number;
    icon: LucideIcon;
}

const StatCard = ({
    title,
    value,
    icon: Icon,
}: Props) => {
    return (
        <motion.div
            whileHover={{
                y: -6,
                scale: 1.02,
            }}
            transition={{
                duration: 0.2,
            }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-100 hover:shadow-xl"
        >
            {/* Background Decoration */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-50 transition-all duration-300 group-hover:scale-125" />

            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-4 text-3xl font-bold text-slate-800 sm:text-4xl">
                        {value}
                    </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    <Icon
                        size={26}
                        className="text-white"
                    />
                </div>
            </div>

            <div className="relative z-10 mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" />
            </div>
        </motion.div>
    );
};

export default StatCard;