// import { useEffect, useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { Link, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// import api from "../services/api";
// import MainLayout from "../layouts/MainLayout";
// import KanbanBoard from "../components/task/KanbanBoard";

// import type { Project } from "../types/project";

// const ProjectDetails = () => {
//     const { projectId } = useParams();

//     const [project, setProject] = useState<Project | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProject = async () => {
//             try {
//                 const res = await api.get(`/projects/${projectId}`);

//                 setProject(res.data.project);
//             } catch (error) {
//                 console.log(error);
//                 toast.error("Failed to load project");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProject();
//     }, [projectId]);

//     if (loading) {
//         return (
//             <MainLayout>
//                 <div className="flex items-center justify-center py-20">
//                     <p className="text-slate-500">Loading project...</p>
//                 </div>
//             </MainLayout>
//         );
//     }

//     if (!project) {
//         return (
//             <MainLayout>
//                 <div className="flex items-center justify-center py-20">
//                     <p className="text-red-500">Project not found.</p>
//                 </div>
//             </MainLayout>
//         );
//     }

//     return (
//         <MainLayout>
//             <Link
//                 to={`/workspaces/${project.workspace}`}
//                 className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-blue-600"
//             >
//                 <ArrowLeft size={18} />
//                 Back to Workspace
//             </Link>

//             <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//                 <div className="flex items-center gap-4">
//                     <div
//                         className="h-5 w-5 rounded-full"
//                         style={{
//                             backgroundColor: project.color,
//                         }}
//                     />

//                     <div>
//                         <h1 className="text-3xl font-bold text-slate-800">
//                             {project.title}
//                         </h1>

//                         <p className="mt-2 text-slate-500">
//                             {project.description || "No description"}
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <KanbanBoard
//                 workspaceId={project.workspace}
//                 projectId={project._id}
//             />
//         </MainLayout>
//     );
// };

// export default ProjectDetails;

import { useEffect, useState } from "react";
import {
    ArrowLeft,
    FolderKanban,
    Circle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import KanbanBoard from "../components/task/KanbanBoard";

import type { Project } from "../types/project";

const ProjectDetails = () => {
    const { projectId } = useParams();

    const [project, setProject] =
        useState<Project | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(
                    `/projects/${projectId}`
                );

                setProject(res.data.project);
            } catch (error) {
                console.log(error);

                toast.error("Failed to load project");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="rounded-2xl bg-white px-8 py-6 shadow">
                        <p className="animate-pulse text-slate-500">
                            Loading project...
                        </p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!project) {
        return (
            <MainLayout>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="rounded-2xl bg-white px-8 py-6 shadow">
                        <p className="font-medium text-red-500">
                            Project not found.
                        </p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-8">

                {/* Back Button */}

                <Link
                    to={`/workspaces/${project.workspace}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
                >
                    <ArrowLeft size={18} />

                    Back to Workspace
                </Link>

                {/* Hero */}

                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-xl sm:p-8">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex items-start gap-5">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                                <FolderKanban size={34} />
                            </div>

                            <div>

                                <div className="flex flex-wrap items-center gap-3">


                                    <span className="text-sm font-medium text-blue-100">
                                        Active Project
                                    </span>

                                </div>

                                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                                    {project.title}
                                </h1>

                                <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100 sm:text-base">
                                    {project.description ||
                                        "No description available for this project."}
                                </p>

                            </div>

                        </div>

                        <div className="rounded-2xl bg-white/10 px-6 py-5 backdrop-blur">
                            <p className="text-sm text-blue-100">
                                Board
                            </p>

                            <h2 className="mt-1 text-3xl font-bold">
                                Kanban
                            </h2>

                            <p className="text-xs text-blue-100">
                                Drag & Drop Tasks
                            </p>
                        </div>

                    </div>

                </div>

                {/* Kanban */}

                <KanbanBoard
                    workspaceId={project.workspace}
                    projectId={project._id}
                />

            </div>
        </MainLayout>
    );
};

export default ProjectDetails;