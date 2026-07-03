

// import { Bell, Menu } from "lucide-react";
// import { useLocation } from "react-router-dom";

// import { useAuthStore } from "../../store/authStore";

// interface Props {
//     setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Navbar = ({ setMobileOpen }: Props) => {
//     const user = useAuthStore((state) => state.user);

//     const location = useLocation();

//     const getTitle = () => {
//         if (location.pathname.includes("workspaces"))
//             return "Workspaces";

//         if (location.pathname.includes("projects"))
//             return "Projects";

//         return "Dashboard";
//     };

//     return (
//         <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md">
//             <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

//                 {/* Left */}
//                 <div className="flex items-center gap-4">

//                     {/* Mobile Menu */}
//                     <button
//                         onClick={() => setMobileOpen(true)}
//                         className="rounded-xl p-2 transition hover:bg-slate-100 lg:hidden"
//                     >
//                         <Menu size={22} />
//                     </button>

//                     <div>
//                         <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
//                             {getTitle()}
//                         </h1>

//                         <p className="hidden text-xs text-slate-500 sm:block">
//                             Welcome back 👋
//                         </p>
//                     </div>

//                 </div>

//                 {/* Right */}
//                 <div className="flex items-center gap-3">

//                     <button
//                         className="relative rounded-xl p-2 transition hover:bg-slate-100"
//                     >
//                         <Bell
//                             size={21}
//                             className="text-slate-600"
//                         />

//                         <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
//                     </button>

//                     <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-1 shadow-sm">

//                         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow">
//                             {user?.name?.charAt(0).toUpperCase()}
//                         </div>

//                         <div className="hidden sm:block">
//                             <p className="text-sm font-semibold text-slate-800">
//                                 {user?.name}
//                             </p>

//                             <p className="text-xs text-slate-500">
//                                 Team Member
//                             </p>
//                         </div>

//                     </div>

//                 </div>

//             </div>
//         </header>
//     );
// };

// export default Navbar;

import {
    Bell,
    Menu,
    Search,
} from "lucide-react";
import { useLocation } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

interface Props {
    setMobileOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}

const Navbar = ({ setMobileOpen }: Props) => {
    const user = useAuthStore((state) => state.user);

    const location = useLocation();

    const getTitle = () => {
        if (location.pathname.includes("workspaces"))
            return "Workspaces";

        if (location.pathname.includes("projects"))
            return "Projects";

        return "Dashboard";
    };

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
                ? "Good Afternoon"
                : "Good Evening";

    const today = new Date().toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
        }
    );

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
            <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Left */}

                <div className="flex items-center gap-4">

                    <button
                        onClick={() =>
                            setMobileOpen(true)
                        }
                        className="rounded-xl p-2 transition hover:bg-slate-100 lg:hidden"
                    >
                        <Menu size={22} />
                    </button>

                    <div>

                        <h1 className="text-2xl font-bold text-slate-800">
                            {getTitle()}
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            {greeting},{" "}
                            <span className="font-medium">
                                {user?.name}
                            </span>{" "}
                            👋
                        </p>

                    </div>

                </div>

                {/* Center Search */}

                <div className="hidden w-full max-w-md px-10 lg:block">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-3.5 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                        />

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-4">

                    <div className="hidden text-right lg:block">

                        <p className="text-sm font-semibold text-slate-700">
                            {today}
                        </p>

                        <p className="text-xs text-slate-500">
                            Stay productive 🚀
                        </p>

                    </div>

                    <button className="relative rounded-xl p-2 transition hover:bg-slate-100">

                        <Bell
                            size={21}
                            className="text-slate-600"
                        />

                        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />

                    </button>

                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-semibold text-white shadow">

                            {user?.name
                                ?.charAt(0)
                                .toUpperCase()}

                        </div>

                        <div className="hidden md:block">

                            <p className="text-sm font-semibold text-slate-800">
                                {user?.name}
                            </p>

                            <p className="max-w-[170px] truncate text-xs text-slate-500">
                                {user?.email}
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </header>
    );
};

export default Navbar;