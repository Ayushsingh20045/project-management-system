import { Plus, ListTodo } from "lucide-react";
import { useState } from "react";

import TaskModal from "./TaskModal";

interface Props {
    workspaceId: string;
    projectId: string;
}

const EmptyTask = ({
    workspaceId,
    projectId,
}: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">

                <div className="rounded-full bg-slate-100 p-5">
                    <ListTodo
                        size={40}
                        className="text-slate-500"
                    />
                </div>

                <h2 className="mt-6 text-2xl font-semibold">
                    No Tasks Yet
                </h2>

                <p className="mt-3 max-w-md text-center text-slate-500">
                    Create your first task to start managing this project.
                </p>

                <button
                    onClick={() => setOpen(true)}
                    className="mt-8 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                    <Plus size={18} />

                    Create Task
                </button>
            </div>

            <TaskModal
                open={open}
                workspaceId={workspaceId}
                projectId={projectId}
                onClose={() => setOpen(false)}
            />
        </>
    );
};

export default EmptyTask;