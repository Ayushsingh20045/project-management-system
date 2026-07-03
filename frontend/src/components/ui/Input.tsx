// // import { InputHTMLAttributes } from "react";

// // interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
// //     label: string;
// //     error?: string;
// // }

// // const Input = ({ label, error, ...props }: InputProps) => {
// //     return (
// //         <div className="space-y-2">
// //             <label className="text-sm font-medium text-slate-700">
// //                 {label}
// //             </label>

// //             <input
// //                 {...props}
// //                 className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
// //             />

// //             {error && (
// //                 <p className="text-sm text-red-500">{error}</p>
// //             )}
// //         </div>
// //     );
// // };

// // export default Input;

// import { forwardRef, InputHTMLAttributes } from "react";

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//     label: string;
//     error?: string;
// }

// const Input = forwardRef<HTMLInputElement, InputProps>(
//     ({ label, error, className = "", ...props }, ref) => {
//         return (
//             <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700">
//                     {label}
//                 </label>

//                 <input
//                     ref={ref}
//                     {...props}
//                     className={`w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 ${className}`}
//                 />

//                 {error && (
//                     <p className="text-sm text-red-500">{error}</p>
//                 )}
//             </div>
//         );
//     }
// );

// Input.displayName = "Input";

// export default Input;

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            className = "",
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                    {label}
                </label>

                <input
                    ref={ref}
                    disabled={disabled}
                    {...props}
                    className={`
                        w-full
                        rounded-2xl
                        border
                        px-4
                        py-3
                        text-sm
                        text-slate-800
                        placeholder:text-slate-400
                        bg-white
                        transition-all
                        duration-200
                        outline-none
                        shadow-sm

                        ${error
                            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                            : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        }

                        ${disabled
                            ? "cursor-not-allowed bg-slate-100 text-slate-400"
                            : "hover:border-slate-400"
                        }

                        ${className}
                    `}
                />

                {error && (
                    <p className="flex items-center gap-1 text-sm font-medium text-red-500">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;