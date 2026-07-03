import { useForm } from "react-hook-form";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/api";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface Props {
    open: boolean;
    workspaceId: string;
    onClose: () => void;
    onAdded: () => void;
}

interface FormData {
    email: string;
}

const AddMemberModal = ({
    open,
    workspaceId,
    onClose,
    onAdded,
}: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            await api.post(
                `/workspaces/${workspaceId}/members`,
                data
            );

            toast.success("Member added successfully");

            reset();

            onAdded();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Failed to add member"
            );
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="space-y-6">

                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
                        <UserPlus
                            size={28}
                            className="text-white"
                        />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Add Member
                        </h2>

                        <p className="text-sm text-slate-500">
                            Invite a user using their email address.
                        </p>
                    </div>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <Input
                        label="Email"
                        placeholder="john@example.com"
                        error={errors.email?.message}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value:
                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message:
                                    "Enter a valid email",
                            },
                        })}
                    />

                    <div className="flex gap-3">

                        <Button
                            type="button"
                            onClick={onClose}
                            className="bg-slate-200 text-slate-700 hover:bg-slate-300"
                        >
                            Cancel
                        </Button>

                        <Button disabled={isSubmitting}>
                            {isSubmitting
                                ? "Adding..."
                                : "Add Member"}
                        </Button>

                    </div>

                </form>

            </div>
        </Modal>
    );
};

export default AddMemberModal;