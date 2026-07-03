// import { motion } from "framer-motion";
// import {
//     ArrowRight,
//     Pencil,
//     Trash2,
//     FolderKanban,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import type { Project } from "../../types/project";

// interface ProjectCardProps {
//     project: Project;
//     workspaceId: string;
//     onEdit: (project: Project) => void;
//     onDelete: (project: Project) => void;
// }

// const ProjectCard = ({
//     project,
//     workspaceId,
//     onEdit,
//     onDelete,
// }: ProjectCardProps) => {
//     const navigate = useNavigate();

//     return (
//         <motion.div
//             whileHover={{ y: -4 }}
//             transition={{ duration: 0.2 }}
//             className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
//         >
//             {/* Top Color Bar */}
//             <div
//                 className="h-2"
//                 style={{
//                     backgroundColor: project.color || "#2563EB",
//                 }}
//             />

//             <div className="p-6">
//                 {/* Header */}
//                 <div className="flex items-start justify-between">
//                     <div className="flex items-center gap-3">
//                         <div
//                             className="rounded-lg p-2"
//                             style={{
//                                 backgroundColor: `${project.color || "#2563EB"}20`,
//                             }}
//                         >
//                             <FolderKanban
//                                 size={18}
//                                 color={project.color || "#2563EB"}
//                             />
//                         </div>

//                         <div>
//                             <h2 className="text-lg font-semibold text-slate-800">
//                                 {project.title}
//                             </h2>

//                             <p className="mt-1 text-sm text-slate-500">
//                                 {project.description || "No description"}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => onEdit(project)}
//                             className="rounded-lg p-2 transition hover:bg-slate-100"
//                         >
//                             <Pencil
//                                 size={18}
//                                 className="text-slate-500"
//                             />
//                         </button>

//                         <button
//                             onClick={() => onDelete(project)}
//                             className="rounded-lg p-2 transition hover:bg-red-50"
//                         >
//                             <Trash2
//                                 size={18}
//                                 className="text-red-500"
//                             />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="mt-8 flex items-center justify-between">
//                     <span className="text-sm text-slate-400">
//                         {new Date(
//                             project.createdAt
//                         ).toLocaleDateString()}
//                     </span>

//                     <button
//                         onClick={() =>
//                             navigate(`/projects/${project._id}`, {
//                                 state: {
//                                     workspaceId,
//                                 },
//                             })
//                         }
//                         className="flex items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700"
//                     >
//                         Open

//                         <ArrowRight size={18} />
//                     </button>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default ProjectCard;

import { motion } from "framer-motion";
import {
    ArrowRight,
    CalendarClock,
    CheckCircle2,
    Pencil,
    Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Project } from "../../types/project";

interface Props {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
}

const ProjectCard = ({
    project,
    onEdit,
    onDelete,
}: Props) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
        >
            {/* Header */}

            <div className="flex items-start justify-between">

                <div className="flex items-start gap-4">

                    <div
                        className="h-5 w-5 rounded-full mt-1"
                        style={{
                            backgroundColor: project.color,
                        }}
                    />

                    <div>

                        <h2 className="text-xl font-bold text-slate-800">
                            {project.title}
                        </h2>

                        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                            {project.description ||
                                "No description"}
                        </p>

                    </div>

                </div>

                <div className="flex gap-2">

                    <button
                        onClick={() =>
                            onEdit(project)
                        }
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >
                        <Pencil
                            size={18}
                            className="text-slate-500"
                        />
                    </button>

                    <button
                        onClick={() =>
                            onDelete(project)
                        }
                        className="rounded-lg p-2 hover:bg-red-50"
                    >
                        <Trash2
                            size={18}
                            className="text-red-500"
                        />
                    </button>

                </div>

            </div>

            {/* Progress */}

            <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">

                    <span className="text-sm font-medium text-slate-600">
                        Progress
                    </span>

                    <span className="font-semibold text-blue-600">
                        {project.progress}%
                    </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                    <div
                        className="h-full rounded-full bg-blue-600 transition-all"
                        style={{
                            width: `${project.progress}%`,
                        }}
                    />

                </div>

            </div>

            {/* Stats */}

            <div className="mt-6 flex items-center justify-between text-sm">

                <div className="flex items-center gap-2 text-slate-500">

                    <CheckCircle2
                        size={16}
                        className="text-green-500"
                    />

                    {project.completedTasks}/
                    {project.totalTasks} Tasks

                </div>

                <div className="flex items-center gap-2 text-slate-500">

                    <CalendarClock
                        size={16}
                    />

                    {new Date(
                        project.updatedAt
                    ).toLocaleDateString()}

                </div>

            </div>

            {/* Footer */}

            <button
                onClick={() =>
                    navigate(
                        `/projects/${project._id}`
                    )
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
                Open Project

                <ArrowRight size={18} />

            </button>

        </motion.div>
    );
};

export default ProjectCard;