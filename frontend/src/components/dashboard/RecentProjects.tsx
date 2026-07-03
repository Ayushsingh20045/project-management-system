// import { FolderOpen } from "lucide-react";

// const projects = [
//     "TaskFlow",
//     "CRM Portal",
//     "Employee Tracker",
//     "Inventory System",
// ];

// const RecentProjects = () => {
//     return (
//         <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
//             <h2 className="mb-6 text-lg font-bold">
//                 Recent Projects
//             </h2>

//             <div className="space-y-4">
//                 {projects.map((project) => (
//                     <div
//                         key={project}
//                         className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
//                     >
//                         <div className="flex items-center gap-3">
//                             <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
//                                 <FolderOpen size={18} />
//                             </div>

//                             <div>
//                                 <h4 className="font-medium">
//                                     {project}
//                                 </h4>

//                                 <p className="text-sm text-slate-500">
//                                     Active Project
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RecentProjects;

import { FolderOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { RecentProject } from "../../types/dashboard";

interface Props {
    projects: RecentProject[];
}

const RecentProjects = ({ projects }: Props) => {
    const navigate = useNavigate();

    if (projects.length === 0) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-bold">
                    Recent Projects
                </h2>

                <div className="flex h-72 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200">
                    <div className="text-center">
                        <FolderOpen
                            size={42}
                            className="mx-auto mb-3 text-slate-300"
                        />

                        <h3 className="font-semibold text-slate-700">
                            No Projects
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Create your first project to get started.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">
                    Recent Projects
                </h2>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {projects.length}
                </span>
            </div>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition-all hover:border-blue-200 hover:bg-slate-50"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="h-12 w-12 rounded-xl shadow-sm"
                                style={{
                                    backgroundColor: project.color,
                                }}
                            />

                            <div>
                                <h3 className="font-semibold text-slate-800">
                                    {project.title}
                                </h3>

                                <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                                    {project.description ||
                                        "No description"}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                navigate(
                                    `/projects/${project._id}`
                                )
                            }
                            className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
                        >
                            Open

                            <ArrowRight size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentProjects;