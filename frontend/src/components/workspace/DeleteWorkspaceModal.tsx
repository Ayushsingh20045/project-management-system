import toast from "react-hot-toast";

import api from "../../services/api";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

import type { Workspace } from "../../types/workspace";

interface Props {
    workspace: Workspace | null;
    onClose: () => void;
    onSuccess: () => void;
}

const DeleteWorkspaceModal = ({
    workspace,
    onClose,
    onSuccess,
}: Props) => {
    const handleDelete = async () => {
        if (!workspace) return;

        try {
            await api.delete(`/workspaces/${workspace._id}`);

            toast.success("Workspace deleted");

            onClose();

            onSuccess();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Delete failed"
            );
        }
    };

    return (
        <Modal
            open={workspace !== null}
            onClose={onClose}
        >
            <h2 className="text-2xl font-bold">
                Delete Workspace
            </h2>

            <p className="mt-4 text-slate-600">
                Are you sure you want to delete
                <span className="font-semibold">
                    {" "}
                    {workspace?.name}
                </span>
                ?
            </p>

            <p className="mt-2 text-sm text-red-500">
                This action cannot be undone.
            </p>

            <div className="mt-8 flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="rounded-xl border border-slate-300 px-5 py-2"
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

export default DeleteWorkspaceModal;