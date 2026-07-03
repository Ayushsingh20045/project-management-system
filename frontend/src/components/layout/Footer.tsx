// import {
//     GithubIcon,
//     Linkedin,
//     Mail,
//     Heart,
// } from "lucide-react";

// const Footer = () => {
//     return (
//         <footer className="mt-10 border-t border-slate-200 bg-white">
//             <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">

//                 {/* Left */}

//                 <div>
//                     <h3 className="text-lg font-bold text-slate-800">
//                         TaskFlow
//                     </h3>

//                     <p className="mt-1 text-sm text-slate-500">
//                         A modern project management platform built
//                         with the MERN Stack.
//                     </p>
//                 </div>

//                 {/* Center */}

//                 <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">

//                     <button className="transition hover:text-blue-600">
//                         Dashboard
//                     </button>

//                     <button className="transition hover:text-blue-600">
//                         Workspaces
//                     </button>

//                     <button className="transition hover:text-blue-600">
//                         Projects
//                     </button>

//                     <button className="transition hover:text-blue-600">
//                         Tasks
//                     </button>

//                 </div>

//                 {/* Right */}

//                 <div className="flex items-center gap-3">

//                     <a
//                         href="https://github.com/"
//                         target="_blank"
//                         rel="noreferrer"
//                         className="rounded-full bg-slate-100 p-2 transition hover:bg-blue-600 hover:text-white"
//                     >
//                        <GithubIcon size={18}/>
//                     </a>

//                     <a
//                         href="https://linkedin.com/"
//                         target="_blank"
//                         rel="noreferrer"
//                         className="rounded-full bg-slate-100 p-2 transition hover:bg-blue-600 hover:text-white"
//                     >
//                         <Linkedin size={18} />
//                     </a>

//                     <a
//                         href="mailto:example@gmail.com"
//                         className="rounded-full bg-slate-100 p-2 transition hover:bg-blue-600 hover:text-white"
//                     >
//                         <Mail size={18} />
//                     </a>

//                 </div>

//             </div>

//             <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">

//                 <span className="inline-flex items-center gap-1">
//                     Built with
//                     <Heart
//                         size={14}
//                         className="fill-red-500 text-red-500"
//                     />
//                     using React, Node.js, Express & MongoDB
//                 </span>

//                 <p className="mt-2">
//                     © {new Date().getFullYear()} TaskFlow. All rights reserved.
//                 </p>

//             </div>
//         </footer>
//     );
// };

// export default Footer;

import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-10 border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">

                {/* Logo */}

                <div>
                    <h3 className="text-xl font-bold text-blue-600">
                        TaskFlow
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Organize projects, collaborate with your team,
                        and deliver work efficiently.
                    </p>
                </div>

                {/* Navigation */}

                <div className="flex flex-wrap items-center gap-6 text-sm font-medium">

                    <Link
                        to="/dashboard"
                        className="text-slate-500 transition hover:text-blue-600"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/workspaces"
                        className="text-slate-500 transition hover:text-blue-600"
                    >
                        Workspaces
                    </Link>

                </div>

            </div>

            <div className="border-t border-slate-200 px-6 py-4 text-center text-sm text-slate-500">

                © {new Date().getFullYear()} TaskFlow. Designed & Developed by{" "}
                <span className="font-semibold text-slate-700">
                    Ayush Singh
                </span>

            </div>
        </footer>
    );
};

export default Footer;