

// import {
//     FolderKanban,
//     LayoutDashboard,
//     LogOut,
//     X,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// interface Props {
//     mobileOpen?: boolean;
//     setMobileOpen?: (value: boolean) => void;
// }

// const Sidebar = ({
//     mobileOpen = false,
//     setMobileOpen,
// }: Props) => {
//     const navClass = ({ isActive }: { isActive: boolean }) =>
//         `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
//             ? "bg-blue-50 text-blue-600 shadow-sm"
//             : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//         }`;

//     return (
//         <>
//             {/* Mobile Backdrop */}
//             {mobileOpen && (
//                 <div
//                     onClick={() => setMobileOpen?.(false)}
//                     className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
//                 />
//             )}

//             <aside
//                 className={`
//                 fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300
//                 lg:sticky lg:translate-x-0 lg:shadow-none
//                 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
//             `}
//             >
//                 {/* Logo */}
//                 <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
//                     <div className="flex items-center gap-3">
//                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
//                             T
//                         </div>

//                         <div>
//                             <h1 className="text-xl font-bold text-slate-800">
//                                 TaskFlow
//                             </h1>

//                             <p className="text-xs text-slate-500">
//                                 Project Management
//                             </p>
//                         </div>
//                     </div>

//                     <button
//                         onClick={() => setMobileOpen?.(false)}
//                         className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
//                     >
//                         <X size={20} />
//                     </button>
//                 </div>

//                 {/* Navigation */}
//                 <nav className="flex-1 space-y-2 p-5">
//                     <NavLink
//                         to="/dashboard"
//                         className={navClass}
//                         onClick={() => setMobileOpen?.(false)}
//                     >
//                         <LayoutDashboard size={20} />
//                         Dashboard
//                     </NavLink>

//                     <NavLink
//                         to="/workspaces"
//                         className={navClass}
//                         onClick={() => setMobileOpen?.(false)}
//                     >
//                         <FolderKanban size={20} />
//                         Workspaces
//                     </NavLink>
//                 </nav>

//                 {/* Footer */}
//                 <div className="border-t border-slate-200 p-5">
//                     <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50">
//                         <LogOut size={20} />
//                         Logout
//                     </button>
//                 </div>
//             </aside>
//         </>
//     );
// };

// export default Sidebar;

import {
    FolderKanban,
    LayoutDashboard,
    LogOut,
    X,
    Lightbulb,
    BarChart3,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDashboardStore } from "../../store/dashboardStore";
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

    const { stats, fetchStats } =
        useDashboardStore();

    useEffect(() => {
        fetchStats();
    }, []);

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
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg">
                            TF
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
                <nav className="flex-1 overflow-y-auto p-5">

                    <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                        Menu
                    </p>

                    <div className="space-y-2">

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

                    </div>

                    {/* Overview Card */}

                    <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white shadow-lg">

                        <div className="flex items-center gap-2">

                            <BarChart3 size={18} />

                            <h3 className="font-semibold">
                                Workspace Overview
                            </h3>

                        </div>

                        <div className="mt-5 space-y-4 text-sm">

                            <div className="flex items-center justify-between">
                                <span>Workspaces</span>
                                <span className="rounded-md bg-white/20 px-2 py-1 font-bold">
                                    {stats.totalWorkspaces}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span>Projects</span>
                                <span className="rounded-md bg-white/20 px-2 py-1 font-bold">
                                    {stats.totalProjects}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span>Tasks</span>
                                <span className="rounded-md bg-white/20 px-2 py-1 font-bold">
                                    {stats.totalTasks}
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* Productivity Tip */}

                    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">

                        <div className="flex items-center gap-2">

                            <Lightbulb
                                size={18}
                                className="text-amber-500"
                            />

                            <h4 className="text-sm font-semibold text-slate-700">
                                Productivity Tip
                            </h4>

                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            Break large projects into smaller tasks and
                            complete the highest-priority work first.
                        </p>

                    </div>

                </nav>

                {/* Footer */}

                <div className="border-t border-slate-200 p-5">

                    <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100">
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </aside>
        </>
    );
};

export default Sidebar;