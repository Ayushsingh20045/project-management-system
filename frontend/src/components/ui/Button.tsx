// import { ButtonHTMLAttributes } from "react";
// import { motion } from "framer-motion";

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//     children: React.ReactNode;
// }

// const Button = ({ children, className = "", ...props }: ButtonProps) => {
//     return (
//         <motion.button
//             whileTap={{ scale: 0.97 }}
//             whileHover={{ y: -1 }}
//             className={`w-full rounded-xl bg-blue-600 px-4 py-3 text-white font-medium shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
//             {...props}
//         >
//             {children}
//         </motion.button>
//     );
// };

// export default Button;

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "danger" | "outline";
    size?: "sm" | "md" | "lg";
}

const Button = ({
    children,
    className = "",
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) => {
    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 shadow-md",

        secondary:
            "bg-slate-100 text-slate-700 hover:bg-slate-200",

        outline:
            "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",

        danger:
            "bg-red-600 text-white hover:bg-red-700 shadow-md",
    };

    const sizes = {
        sm: "px-4 py-2.5 text-sm",

        md: "px-5 py-3 text-sm sm:text-base",

        lg: "px-6 py-3.5 text-base",
    };

    return (
        <motion.button
            whileHover={{
                y: -2,
            }}
            whileTap={{
                scale: 0.97,
            }}
            transition={{
                duration: 0.15,
            }}
            className={`
                inline-flex
                w-full
                items-center
                justify-center
                rounded-xl
                font-semibold
                transition-all
                duration-200
                focus:outline-none
                focus:ring-4
                focus:ring-blue-100
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;