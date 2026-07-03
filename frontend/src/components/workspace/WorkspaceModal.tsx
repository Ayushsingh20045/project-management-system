

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FolderKanban } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/api";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

import type { Workspace } from "../../types/workspace";

interface WorkspaceForm {
    name: string;
    description: string;
}

interface Props {
    open: boolean;
    workspace?: Workspace | null;
    onClose: () => void;
    onSuccess: () => void;
}

const WorkspaceModal = ({
    open,
    workspace,
    onClose,
    onSuccess,
}: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<WorkspaceForm>();

    useEffect(() => {
        if (workspace) {
            reset({
                name: workspace.name,
                description: workspace.description,
            });
        } else {
            reset({
                name: "",
                description: "",
            });
        }
    }, [workspace, reset]);

    const onSubmit = async (data: WorkspaceForm) => {
        try {
            if (workspace) {
                await api.put(`/workspaces/${workspace._id}`, data);

                toast.success("Workspace updated successfully");
            } else {
                await api.post("/workspaces", data);

                toast.success("Workspace created successfully");
            }

            reset();

            onClose();

            onSuccess();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="space-y-6 ">

                {/* Header */}
                <div className="flex items-start gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                        <FolderKanban
                            size={28}
                            className="text-white"
                        />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            {workspace
                                ? "Edit Workspace"
                                : "Create Workspace"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {workspace
                                ? "Update your workspace information."
                                : "Create a workspace to organize projects and collaborate with your team."}
                        </p>
                    </div>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 "
                >
                    <Input
                        label="Workspace Name"
                        placeholder="e.g. Product Development"
                        error={errors.name?.message}
                        {...register("name", {
                            required:
                                "Workspace name is required",
                        })}
                    />

                    <Input
                        label="Description"
                        placeholder="Briefly describe the purpose of this workspace..."
                        error={errors.description?.message}
                        {...register("description")}
                    />

                    <div className="pt-2">
                        <Button
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting
                                ? workspace
                                    ? "Updating..."
                                    : "Creating..."
                                : workspace
                                    ? "Update Workspace"
                                    : "Create Workspace"}
                        </Button>
                    </div>
                </form>

            </div>
        </Modal>
    );
};

export default WorkspaceModal;