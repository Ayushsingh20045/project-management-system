// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import type { Workspace } from "../../types/workspace";

// interface Props {
//     workspace: Workspace;
// }

// const WorkspaceCard = ({ workspace }: Props) => {
//     const navigate = useNavigate();

//     return (
//         <motion.div
//             whileHover={{ y: -3 }}
//             className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition"
//         >
//             <h2 className="text-xl font-semibold">
//                 {workspace.name}
//             </h2>

//             <p className="mt-3 text-slate-500 line-clamp-2">
//                 {workspace.description || "No description"}
//             </p>

//             <div className="mt-8 flex items-center justify-between">

//                 <span className="text-sm text-slate-400">
//                     {workspace.members.length} Members
//                 </span>

//                 <button
//                     onClick={() =>
//                         navigate(`/workspace/${workspace._id}`)
//                     }
//                     className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
//                 >
//                     Open

//                     <ArrowRight size={18} />
//                 </button>

//             </div>
//         </motion.div>
//     );
// };

// export default WorkspaceCard;

// import { motion } from "framer-motion";
// import { ArrowRight, Pencil, Trash2, Users } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import type { Workspace } from "../../types/workspace";

// interface WorkspaceCardProps {
//     workspace: Workspace;
//     onEdit: (workspace: Workspace) => void;
//     onDelete: (workspace: Workspace) => void;
// }

// const WorkspaceCard = ({
//     workspace,
//     onEdit,
//     onDelete,
// }: WorkspaceCardProps) => {
//     const navigate = useNavigate();

//     return (
//         <motion.div
//             whileHover={{ y: -4 }}
//             transition={{ duration: 0.2 }}
//             className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
//         >
//             <div className="flex items-start justify-between">
//                 <div>
//                     <h2 className="text-xl font-semibold text-slate-800">
//                         {workspace.name}
//                     </h2>

//                     <p className="mt-2 text-sm text-slate-500">
//                         {workspace.description || "No description"}
//                     </p>
//                 </div>

//                 <div className="flex items-center gap-2">
//                     <button
//                         onClick={() => onEdit(workspace)}
//                         className="rounded-lg p-2 transition hover:bg-slate-100"
//                     >
//                         <Pencil size={18} className="text-slate-500" />
//                     </button>

//                     <button
//                         onClick={() => onDelete(workspace)}
//                         className="rounded-lg p-2 transition hover:bg-red-50"
//                     >
//                         <Trash2 size={18} className="text-red-500" />
//                     </button>
//                 </div>
//             </div>

//             <div className="mt-8 flex items-center justify-between">
//                 <div className="flex items-center gap-2 text-sm text-slate-500">
//                     <Users size={16} />

//                     <span>{workspace.members.length} Members</span>
//                 </div>

//                 <button
//                     onClick={() =>
//                         navigate(`/workspaces/${workspace._id}`)
//                     }
//                     className="flex items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700"
//                 >
//                     Open

//                     <ArrowRight size={18} />
//                 </button>
//             </div>
//         </motion.div>
//     );
// };

// export default WorkspaceCard;

import { motion } from "framer-motion";
import {
    ArrowRight,
    Pencil,
    Trash2,
    Users,
    FolderKanban,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Workspace } from "../../types/workspace";

interface WorkspaceCardProps {
    workspace: Workspace;
    onEdit: (workspace: Workspace) => void;
    onDelete: (workspace: Workspace) => void;
}

const WorkspaceCard = ({
    workspace,
    onEdit,
    onDelete,
}: WorkspaceCardProps) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{
                y: -6,
                scale: 1.02,
            }}
            transition={{
                duration: 0.2,
            }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-100 hover:shadow-2xl"
        >
            {/* Decorative Gradient */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

            {/* Decorative Background */}
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-50 transition-transform duration-300 group-hover:scale-125" />

            <div className="relative z-10 flex h-full flex-col p-6">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0 flex-1">

                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                            <FolderKanban
                                size={26}
                                className="text-white"
                            />
                        </div>

                        <h2 className="truncate text-xl font-bold text-slate-800">
                            {workspace.name}
                        </h2>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                            {workspace.description ||
                                "No description available for this workspace."}
                        </p>

                    </div>

                    <div className="flex shrink-0 items-center gap-2">

                        <button
                            onClick={() => onEdit(workspace)}
                            className="rounded-xl p-2 text-slate-500 transition-all hover:bg-slate-100 hover:text-blue-600"
                        >
                            <Pencil size={18} />
                        </button>

                        <button
                            onClick={() => onDelete(workspace)}
                            className="rounded-xl p-2 text-red-500 transition-all hover:bg-red-50"
                        >
                            <Trash2 size={18} />
                        </button>

                    </div>

                </div>

                {/* Footer */}

                <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">

                        <Users size={16} />

                        {workspace.members.length} Members

                    </div>

                    <button
                        onClick={() =>
                            navigate(
                                `/workspaces/${workspace._id}`
                            )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition-all hover:scale-105 hover:bg-blue-700"
                    >
                        Open Workspace

                        <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </button>

                </div>

            </div>
        </motion.div>
    );
};

export default WorkspaceCard;