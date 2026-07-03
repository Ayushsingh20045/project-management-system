import Modal from "../ui/Modal";
import Button from "../ui/Button";

import { useTaskStore } from "../../store/taskStore";

import type { Task } from "../../types/task";

interface Props {
    open: boolean;
    workspaceId: string;
    projectId: string;
    task: Task;
    onClose: () => void;
}

const DeleteTaskModal = ({
    open,
    workspaceId,
    projectId,
    task,
    onClose,
}: Props) => {
    const { deleteTask } = useTaskStore();

    const handleDelete = async () => {
        await deleteTask(
            workspaceId,
            projectId,
            task._id
        );

        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <h2 className="text-2xl font-bold">
                Delete Task
            </h2>

            <p className="mt-4 text-slate-500">
                Are you sure you want to delete
                <span className="font-semibold">
                    {" "}
                    {task.title}
                </span>
                ?
            </p>

            <div className="mt-8 flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="rounded-lg border px-4 py-2 hover:bg-slate-100"
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

export default DeleteTaskModal;