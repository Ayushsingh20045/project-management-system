// import { motion } from "framer-motion";
// import { CalendarDays, Pencil, Trash2 } from "lucide-react";
// import { useState } from "react";
// import { CSS } from "@dnd-kit/utilities";
// import { useSortable } from "@dnd-kit/sortable";
// import TaskModal from "./TaskModal";
// import DeleteTaskModal from "./DeleteTaskModal";

// import type { Task } from "../../types/task";

// interface Props {
//     workspaceId: string;
//     projectId: string;
//     task: Task;
// }

// const TaskCard = ({
//     workspaceId,
//     projectId,
//     task,
// }: Props) => {
//     const [editOpen, setEditOpen] = useState(false);
//     const [deleteOpen, setDeleteOpen] = useState(false);

//     const priorityColor = {
//         Low: "bg-green-100 text-green-700",
//         Medium: "bg-yellow-100 text-yellow-700",
//         High: "bg-red-100 text-red-700",
//     };
//     const {
//         attributes,
//         listeners,
//         setNodeRef,
//         transform,
//         transition,
//         isDragging,
//     } = useSortable({
//         id: task._id,
//         data: {
//             task,
//         },
//     });

//     const style = {
//         transform: CSS.Transform.toString(transform),
//         transition,
//     };
//     return (
//         <>
//             <motion.div
//                 ref={setNodeRef}
//                 style={style}
//                 {...attributes}
//                 {...listeners}
//                 layout
//                 whileHover={{ y: -3 }}
//                 className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow ${isDragging
//                         ? "opacity-50 shadow-2xl rotate-2 z-50"
//                         : "hover:shadow-md"
//                     }`}
//             >
//                 <div className="flex items-start justify-between">
//                     <h3 className="font-semibold text-slate-800">
//                         {task.title}
//                     </h3>

//                     <div className="flex gap-1">
//                         <button
//                             onClick={() => setEditOpen(true)}
//                             className="rounded-md p-1 hover:bg-slate-100"
//                         >
//                             <Pencil
//                                 size={16}
//                                 className="text-slate-500"
//                             />
//                         </button>

//                         <button
//                             onClick={() => setDeleteOpen(true)}
//                             className="rounded-md p-1 hover:bg-red-50"
//                         >
//                             <Trash2
//                                 size={16}
//                                 className="text-red-500"
//                             />
//                         </button>
//                     </div>
//                 </div>

//                 <p className="mt-3 text-sm text-slate-500 line-clamp-3">
//                     {task.description || "No description"}
//                 </p>

//                 <div className="mt-5 flex items-center justify-between">
//                     <span
//                         className={`rounded-full px-3 py-1 text-xs font-medium ${priorityColor[task.priority]}`}
//                     >
//                         {task.priority}
//                     </span>

//                     {task.dueDate && (
//                         <div className="flex items-center gap-1 text-xs text-slate-500">
//                             <CalendarDays size={14} />

//                             {new Date(task.dueDate).toLocaleDateString()}
//                         </div>
//                     )}
//                 </div>
//             </motion.div>

//             <TaskModal
//                 open={editOpen}
//                 workspaceId={workspaceId}
//                 projectId={projectId}
//                 task={task}
//                 onClose={() => setEditOpen(false)}
//             />

//             <DeleteTaskModal
//                 open={deleteOpen}
//                 workspaceId={workspaceId}
//                 projectId={projectId}
//                 task={task}
//                 onClose={() => setDeleteOpen(false)}
//             />
//         </>
//     );
// };

// export default TaskCard;
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";

import TaskModal from "./TaskModal";
import DeleteTaskModal from "./DeleteTaskModal";

import type { Task } from "../../types/task";

interface Props {
    index: number;
    workspaceId: string;
    projectId: string;
    task: Task;
}

const TaskCard = ({
    index,
    workspaceId,
    projectId,
    task,
}: Props) => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const priorityColor = {
        Low: "bg-green-100 text-green-700",
        Medium: "bg-yellow-100 text-yellow-700",
        High: "bg-red-100 text-red-700",
    };

    return (
        <>
            <Draggable
                draggableId={task._id}
                index={index}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                     
                        className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all
                        ${snapshot.isDragging
                                ? "shadow-2xl ring-2 ring-blue-400"
                                : "hover:shadow-md"
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-slate-800">
                                {task.title}
                            </h3>

                            <div className="flex gap-1">
                                <button
                                    onClick={() => setEditOpen(true)}
                                    className="rounded-md p-1 hover:bg-slate-100"
                                >
                                    <Pencil
                                        size={16}
                                        className="text-slate-500"
                                    />
                                </button>

                                <button
                                    onClick={() => setDeleteOpen(true)}
                                    className="rounded-md p-1 hover:bg-red-50"
                                >
                                    <Trash2
                                        size={16}
                                        className="text-red-500"
                                    />
                                </button>
                            </div>
                        </div>

                        <p className="mt-3 line-clamp-3 text-sm text-slate-500">
                            {task.description || "No description"}
                        </p>

                        <div className="mt-5 flex items-center justify-between">
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${priorityColor[task.priority]}`}
                            >
                                {task.priority}
                            </span>

                            {task.dueDate && (
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <CalendarDays size={14} />

                                    {new Date(
                                        task.dueDate
                                    ).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Draggable>

            <TaskModal
                open={editOpen}
                workspaceId={workspaceId}
                projectId={projectId}
                task={task}
                onClose={() => setEditOpen(false)}
            />

            <DeleteTaskModal
                open={deleteOpen}
                workspaceId={workspaceId}
                projectId={projectId}
                task={task}
                onClose={() => setDeleteOpen(false)}
            />
        </>
    );
};

export default TaskCard;