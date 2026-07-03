import { FolderKanban, Plus } from "lucide-react";

interface Props {
    onCreate: () => void;
}

const EmptyProject = ({ onCreate }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">

            <div className="rounded-full bg-slate-100 p-5">
                <FolderKanban
                    size={40}
                    className="text-slate-500"
                />
            </div>

            <h2 className="mt-6 text-2xl font-semibold">
                No Projects Yet
            </h2>

            <p className="mt-3 max-w-md text-center text-slate-500">
                Create your first project inside this workspace and
                start organizing your tasks.
            </p>

            <button
                onClick={onCreate}
                className="mt-8 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
                <Plus size={18} />

                Create Project
            </button>
        </div>
    );
};

export default EmptyProject;