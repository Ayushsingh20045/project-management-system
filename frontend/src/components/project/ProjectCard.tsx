import { motion } from "framer-motion";
import {
    ArrowRight,
    Pencil,
    Trash2,
    FolderKanban,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Project } from "../../types/project";

interface ProjectCardProps {
    project: Project;
    workspaceId: string;
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
}

const ProjectCard = ({
    project,
    workspaceId,
    onEdit,
    onDelete,
}: ProjectCardProps) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
            {/* Top Color Bar */}
            <div
                className="h-2"
                style={{
                    backgroundColor: project.color || "#2563EB",
                }}
            />

            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className="rounded-lg p-2"
                            style={{
                                backgroundColor: `${project.color || "#2563EB"}20`,
                            }}
                        >
                            <FolderKanban
                                size={18}
                                color={project.color || "#2563EB"}
                            />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-slate-800">
                                {project.title}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {project.description || "No description"}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(project)}
                            className="rounded-lg p-2 transition hover:bg-slate-100"
                        >
                            <Pencil
                                size={18}
                                className="text-slate-500"
                            />
                        </button>

                        <button
                            onClick={() => onDelete(project)}
                            className="rounded-lg p-2 transition hover:bg-red-50"
                        >
                            <Trash2
                                size={18}
                                className="text-red-500"
                            />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                        {new Date(
                            project.createdAt
                        ).toLocaleDateString()}
                    </span>

                    <button
                        onClick={() =>
                            navigate(`/projects/${project._id}`, {
                                state: {
                                    workspaceId,
                                },
                            })
                        }
                        className="flex items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700"
                    >
                        Open

                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;