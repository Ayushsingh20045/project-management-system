import { motion } from "framer-motion";

const SplashScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50"
        >
            <div className="text-center">

                {/* Logo */}

                <motion.div
                    initial={{
                        scale: 0,
                        rotate: -180,
                    }}
                    animate={{
                        scale: 1,
                        rotate: 0,
                    }}
                    transition={{
                        duration: 0.7,
                        type: "spring",
                    }}
                    className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-4xl font-bold text-white shadow-2xl"
                >
                    TF
                </motion.div>

                {/* Title */}

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.4,
                    }}
                    className="mt-8 text-4xl font-extrabold tracking-tight text-slate-800"
                >
                    TaskFlow
                </motion.h1>

                {/* Subtitle */}

                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.8,
                    }}
                    className="mt-3 text-slate-500"
                >
                    Manage • Organize • Deliver
                </motion.p>

                {/* Progress */}

                <div className="mx-auto mt-10 h-2 w-64 overflow-hidden rounded-full bg-slate-200">

                    <motion.div
                        initial={{
                            width: 0,
                        }}
                        animate={{
                            width: "100%",
                        }}
                        transition={{
                            duration: 1.8,
                            ease: "easeInOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    />

                </div>

                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 1,
                    }}
                    className="mt-4 text-sm text-slate-500"
                >
                    Loading workspace...
                </motion.p>

            </div>
        </motion.div>
    );
};

export default SplashScreen;