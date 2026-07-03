import { FolderOpen, Plus } from "lucide-react";

interface Props {
    onCreate: () => void;
}

const EmptyWorkspace = ({ onCreate }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">

            <div className="rounded-full bg-slate-100 p-5">
                <FolderOpen
                    size={40}
                    className="text-slate-500"
                />
            </div>

            <h2 className="mt-6 text-2xl font-semibold">
                No Workspaces Yet
            </h2>

            <p className="mt-3 max-w-md text-center text-slate-500">
                Create your first workspace to organize projects,
                collaborate with your team, and manage tasks.
            </p>

            <button
                onClick={onCreate}
                className="mt-8 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
                <Plus size={18} />

                Create Workspace
            </button>
        </div>
    );
};

export default EmptyWorkspace;