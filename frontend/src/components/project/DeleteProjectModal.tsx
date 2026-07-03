import toast from "react-hot-toast";

import api from "../../services/api";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

import type { Project } from "../../types/project";

interface Props {
    project: Project | null;
    onClose: () => void;
    onSuccess: () => void;
    workspaceId:string
}

const DeleteProjectModal = ({
    project,
    onClose,
    onSuccess,
    workspaceId
}: Props) => {
    const handleDelete = async () => {
        if (!project) return;

        try {
            await api.delete(
                `/workspaces/${workspaceId}/projects/${project._id}`
            );

            toast.success("Project deleted successfully");

            onClose();

            onSuccess();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Failed to delete project"
            );
        }
    };

    return (
        <Modal
            open={project !== null}
            onClose={onClose}
        >
            <h2 className="text-2xl font-bold text-slate-800">
                Delete Project
            </h2>

            <p className="mt-4 text-slate-600">
                Are you sure you want to delete
                <span className="font-semibold">
                    {" "}
                    {project?.title}
                </span>
                ?
            </p>

            <p className="mt-2 text-sm text-red-500">
                This action cannot be undone.
            </p>

            <div className="mt-8 flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="rounded-xl border border-slate-300 px-5 py-2 transition hover:bg-slate-100"
                >
                    Cancel
                </button>

                <Button
                    onClick={handleDelete}
                    className="w-auto bg-red-600 hover:bg-red-700"
                >
                    Delete
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteProjectModal;