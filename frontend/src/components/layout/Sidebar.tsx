// import { FolderKanban, LayoutDashboard, LogOut } from "lucide-react";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//     return (
//         <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
//             {/* Logo */}
//             <div className="border-b border-slate-200 p-6">
//                 <h1 className="text-2xl font-bold text-blue-600">
//                     TaskFlow
//                 </h1>
//             </div>

//             {/* Navigation */}
//             <nav className="flex-1 space-y-2 p-4">

//                 <NavLink
//                     to="/dashboard"
//                     className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
//                 >
//                     <LayoutDashboard size={20} />
//                     Dashboard
//                 </NavLink>

//                 <NavLink
//                     to="/workspaces"
//                     className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
//                 >
//                     <FolderKanban size={20} />
//                     Workspaces
//                 </NavLink>

//             </nav>

//             {/* Footer */}
//             <div className="border-t border-slate-200 p-4">
//                 <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50">
//                     <LogOut size={20} />
//                     Logout
//                 </button>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;

import {
    FolderKanban,
    LayoutDashboard,
    LogOut,
    X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface Props {
    mobileOpen?: boolean;
    setMobileOpen?: (value: boolean) => void;
}

const Sidebar = ({
    mobileOpen = false,
    setMobileOpen,
}: Props) => {
    const navClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
            ? "bg-blue-50 text-blue-600 shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    return (
        <>
            {/* Mobile Backdrop */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen?.(false)}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                />
            )}

            <aside
                className={`
                fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300
                lg:sticky lg:translate-x-0 lg:shadow-none
                ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            >
                {/* Logo */}
                <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                            T
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-slate-800">
                                TaskFlow
                            </h1>

                            <p className="text-xs text-slate-500">
                                Project Management
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setMobileOpen?.(false)}
                        className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2 p-5">
                    <NavLink
                        to="/dashboard"
                        className={navClass}
                        onClick={() => setMobileOpen?.(false)}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/workspaces"
                        className={navClass}
                        onClick={() => setMobileOpen?.(false)}
                    >
                        <FolderKanban size={20} />
                        Workspaces
                    </NavLink>
                </nav>

                {/* Footer */}
                <div className="border-t border-slate-200 p-5">
                    <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;