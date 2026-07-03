import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import api from "../../services/api";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

import type { Project } from "../../types/project";

interface ProjectForm {
    title: string;
    description: string;
    color: string;
}

interface Props {
    open: boolean;
    workspaceId: string;
    project?: Project | null;
    onClose: () => void;
    onSuccess: () => void;
}

const ProjectModal = ({
    open,
    workspaceId,
    project,
    onClose,
    onSuccess,
}: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProjectForm>();

    useEffect(() => {
        if (project) {
            reset({
                title: project.title,
                description: project.description,
                color: project.color,
            });
        } else {
            reset({
                title: "",
                description: "",
                color: "#2563EB",
            });
        }
    }, [project, reset]);

    const onSubmit = async (data: ProjectForm) => {
        try {
            if (project) {
                await api.put(
                    `/workspaces/${workspaceId}/projects/${project._id}`,
                    data
                );

                toast.success("Project updated successfully");
            } else {
                await api.post(
                    `/workspaces/${workspaceId}/projects`,
                    data
                );

                toast.success("Project created successfully");
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
            <h2 className="mb-6 text-2xl font-bold">
                {project ? "Edit Project" : "Create Project"}
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <Input
                    label="Project Title"
                    placeholder="CRM Portal"
                    error={errors.title?.message}
                    {...register("title", {
                        required: "Project title is required",
                    })}
                />

                <Input
                    label="Description"
                    placeholder="Customer Management System"
                    error={errors.description?.message}
                    {...register("description")}
                />

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                        Project Color
                    </label>

                    <input
                        type="color"
                        className="h-12 w-full cursor-pointer rounded-lg border border-slate-300"
                        {...register("color")}
                    />
                </div>

                <Button disabled={isSubmitting}>
                    {isSubmitting
                        ? project
                            ? "Updating..."
                            : "Creating..."
                        : project
                            ? "Update Project"
                            : "Create Project"}
                </Button>
            </form>
        </Modal>
    );
};

export default ProjectModal;