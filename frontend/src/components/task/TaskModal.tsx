// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { ListTodo } from "lucide-react";

// import Modal from "../ui/Modal";
// import Input from "../ui/Input";
// import Button from "../ui/Button";

// import { useTaskStore } from "../../store/taskStore";

// import type {
//     Task,
//     TaskPriority,
//     TaskStatus,
// } from "../../types/task";

// interface TaskForm {
//     title: string;
//     description: string;
//     status: TaskStatus;
//     priority: TaskPriority;
//     dueDate: string;
// }

// interface Props {
//     open: boolean;
//     workspaceId: string;
//     projectId: string;
//     task?: Task | null;
//     defaultStatus?: TaskStatus;
//     onClose: () => void;
// }

// const TaskModal = ({
//     open,
//     workspaceId,
//     projectId,
//     task,
//     defaultStatus = "Todo",
//     onClose,
// }: Props) => {
//     const { createTask, updateTask } = useTaskStore();

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors, isSubmitting },
//     } = useForm<TaskForm>();

//     useEffect(() => {
//         if (task) {
//             reset({
//                 title: task.title,
//                 description: task.description,
//                 status: task.status,
//                 priority: task.priority,
//                 dueDate: task.dueDate
//                     ? task.dueDate.substring(0, 10)
//                     : "",
//             });
//         } else {
//             reset({
//                 title: "",
//                 description: "",
//                 status: defaultStatus,
//                 priority: "Medium",
//                 dueDate: "",
//             });
//         }
//     }, [task, defaultStatus, reset]);

//     const onSubmit = async (data: TaskForm) => {
//         if (task) {
//             await updateTask(
//                 workspaceId,
//                 projectId,
//                 task._id,
//                 data
//             );
//         } else {
//             await createTask(
//                 workspaceId,
//                 projectId,
//                 data
//             );
//         }

//         reset();
//         onClose();
//     };

//     return (
//         <Modal open={open} onClose={onClose}>
//             <div className="space-y-6">

//                 {/* Header */}

//                 <div className="flex items-center gap-4">

//                     <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600">
//                         <ListTodo
//                             size={28}
//                             className="text-white"
//                         />
//                     </div>

//                     <div>
//                         <h2 className="text-2xl font-bold text-slate-800">
//                             {task
//                                 ? "Edit Task"
//                                 : "Create Task"}
//                         </h2>

//                         <p className="text-sm text-slate-500">
//                             {task
//                                 ? "Update task details."
//                                 : "Create a new task for your project."}
//                         </p>
//                     </div>

//                 </div>

//                 {/* Form */}

//                 <form
//                     onSubmit={handleSubmit(onSubmit)}
//                     className="space-y-5"
//                 >
//                     <Input
//                         label="Task Title"
//                         placeholder="Design Landing Page"
//                         error={errors.title?.message}
//                         {...register("title", {
//                             required:
//                                 "Task title is required",
//                         })}
//                     />

//                     <Input
//                         label="Description"
//                         placeholder="Task description..."
//                         {...register("description")}
//                     />

//                     <div className="grid gap-5 md:grid-cols-2">

//                         <div className="space-y-2">
//                             <label className="text-sm font-semibold text-slate-700">
//                                 Status
//                             </label>

//                             <select
//                                 {...register("status")}
//                                 className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
//                             >
//                                 <option value="Todo">
//                                     Todo
//                                 </option>

//                                 <option value="In Progress">
//                                     In Progress
//                                 </option>

//                                 <option value="Done">
//                                     Done
//                                 </option>
//                             </select>
//                         </div>

//                         <div className="space-y-2">
//                             <label className="text-sm font-semibold text-slate-700">
//                                 Priority
//                             </label>

//                             <select
//                                 {...register("priority")}
//                                 className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
//                             >
//                                 <option value="Low">
//                                     Low
//                                 </option>

//                                 <option value="Medium">
//                                     Medium
//                                 </option>

//                                 <option value="High">
//                                     High
//                                 </option>
//                             </select>
//                         </div>

//                     </div>

//                     <Input
//                         type="date"
//                         label="Due Date"
//                         {...register("dueDate")}
//                     />

//                     <Button disabled={isSubmitting}>
//                         {isSubmitting
//                             ? task
//                                 ? "Updating..."
//                                 : "Creating..."
//                             : task
//                                 ? "Update Task"
//                                 : "Create Task"}
//                     </Button>
//                 </form>

//             </div>
//         </Modal>
//     );
// };

// export default TaskModal;

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ListTodo } from "lucide-react";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { useTaskStore } from "../../store/taskStore";
import { useUserStore } from "../../store/userStore";

import type {
    Task,
    TaskPriority,
    TaskStatus,
} from "../../types/task";

interface TaskForm {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    assignedTo: string;
}

interface Props {
    open: boolean;
    workspaceId: string;
    projectId: string;
    task?: Task | null;
    defaultStatus?: TaskStatus;
    onClose: () => void;
}

const TaskModal = ({
    open,
    workspaceId,
    projectId,
    task,
    defaultStatus = "Todo",
    onClose,
}: Props) => {
    const { createTask, updateTask } = useTaskStore();

    const {
        users,
        fetchWorkspaceUsers,
    } = useUserStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TaskForm>();

    useEffect(() => {
        if (open) {
            fetchWorkspaceUsers(workspaceId);
        }
    }, [open, workspaceId]);

    useEffect(() => {
        if (task) {
            reset({
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate
                    ? task.dueDate.substring(0, 10)
                    : "",
                assignedTo: task.assignedTo?._id || "",
            });
        } else {
            reset({
                title: "",
                description: "",
                status: defaultStatus,
                priority: "Medium",
                dueDate: "",
                assignedTo: "",
            });
        }
    }, [task, defaultStatus, reset]);

    const onSubmit = async (data: TaskForm) => {
        if (task) {
            await updateTask(
                workspaceId,
                projectId,
                task._id,
                data
            );
        } else {
            await createTask(
                workspaceId,
                projectId,
                data
            );
        }

        reset();
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="space-y-6">

                {/* Header */}

                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600">
                        <ListTodo
                            size={28}
                            className="text-white"
                        />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            {task
                                ? "Edit Task"
                                : "Create Task"}
                        </h2>

                        <p className="text-sm text-slate-500">
                            {task
                                ? "Update task details."
                                : "Create a new task for your project."}
                        </p>
                    </div>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <Input
                        label="Task Title"
                        placeholder="Design Landing Page"
                        error={errors.title?.message}
                        {...register("title", {
                            required: "Task title is required",
                        })}
                    />

                    <Input
                        label="Description"
                        placeholder="Task description..."
                        {...register("description")}
                    />

                    <div className="grid gap-5 md:grid-cols-2">

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">
                                Status
                            </label>

                            <select
                                {...register("status")}
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="Todo">
                                    Todo
                                </option>

                                <option value="In Progress">
                                    In Progress
                                </option>

                                <option value="Done">
                                    Done
                                </option>

                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">
                                Priority
                            </label>

                            <select
                                {...register("priority")}
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="Low">
                                    Low
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="High">
                                    High
                                </option>

                            </select>
                        </div>

                    </div>

                    <Input
                        type="date"
                        label="Due Date"
                        {...register("dueDate")}
                    />

                    {/* Assign To */}

                    <div className="space-y-2">

                        <label className="text-sm font-semibold text-slate-700">
                            Assign To
                        </label>

                        <select
                            {...register("assignedTo")}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        >

                            <option value="">
                                Unassigned
                            </option>

                            {users.map((user) => (
                                <option
                                    key={user._id}
                                    value={user._id}
                                >
                                    {user.name}
                                </option>
                            ))}

                        </select>

                    </div>

                    <Button disabled={isSubmitting}>
                        {isSubmitting
                            ? task
                                ? "Updating..."
                                : "Creating..."
                            : task
                                ? "Update Task"
                                : "Create Task"}
                    </Button>

                </form>

            </div>
        </Modal>
    );
};

export default TaskModal;