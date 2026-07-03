// import { useState } from "react";
// import { Plus } from "lucide-react";
// import { motion } from "framer-motion";
// import {
//     SortableContext,
//     verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import TaskCard from "./TaskCard";
// import TaskModal from "./TaskModal";

// import type { Task, TaskStatus } from "../../types/task";

// interface Props {
//     title: string;
//     status: TaskStatus;
//     workspaceId: string;
//     projectId: string;
//     tasks: Task[];
// }

// const TaskColumn = ({
//     title,
//     status,
//     workspaceId,
//     projectId,
//     tasks,
// }: Props) => {
//     const [openModal, setOpenModal] = useState(false);

//     return (
//         <div className="flex min-h-[650px] flex-col rounded-2xl bg-slate-100 p-4">

//             {/* Header */}

//             <div className="mb-4 flex items-center justify-between">
//                 <div>
//                     <h2 className="text-lg font-semibold text-slate-800">
//                         {title}
//                     </h2>

//                     <p className="text-sm text-slate-500">
//                         {tasks.length} Tasks
//                     </p>
//                 </div>

//                 <button
//                     onClick={() => setOpenModal(true)}
//                     className="rounded-lg bg-white p-2 shadow transition hover:bg-slate-50"
//                 >
//                     <Plus size={18} />
//                 </button>
//             </div>

//             {/* Tasks */}

//             <div className="flex flex-1 flex-col gap-4">

//                 <SortableContext
//                     items={tasks.map((task) => task._id)}
//                     strategy={verticalListSortingStrategy}
//                 >

//                     {tasks.length === 0 ? (
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-slate-300"
//                         >
//                             <p className="text-center text-sm text-slate-400">
//                                 No tasks
//                             </p>
//                         </motion.div>
//                     ) : (
//                         tasks.map((task) => (
//                             <TaskCard
//                                 key={task._id}
//                                 workspaceId={workspaceId}
//                                 projectId={projectId}
//                                 task={task}
//                             />
//                         ))
//                     )}

//                 </SortableContext>

//             </div>

//             <TaskModal
//                 open={openModal}
//                 workspaceId={workspaceId}
//                 projectId={projectId}
//                 defaultStatus={status}
//                 onClose={() => setOpenModal(false)}
//             />
//         </div>
//     );
// };

// export default TaskColumn;

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Droppable } from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

import type { Task, TaskStatus } from "../../types/task";

interface Props {
    title: string;
    droppableId: string;
    status: TaskStatus;
    workspaceId: string;
    projectId: string;
    tasks: Task[];
}

const TaskColumn = ({
    title,
    droppableId,
    status,
    workspaceId,
    projectId,
    tasks,
}: Props) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="flex min-h-[650px] flex-col rounded-2xl bg-slate-100 p-4">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                        {title}
                    </h2>

                    <p className="text-sm text-slate-500">
                        {tasks.length} Tasks
                    </p>
                </div>

                <button
                    onClick={() => setOpenModal(true)}
                    className="rounded-lg bg-white p-2 shadow transition hover:bg-slate-50"
                >
                    <Plus size={18} />
                </button>
            </div>

            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex flex-1 flex-col gap-4 rounded-xl transition-all ${snapshot.isDraggingOver
                                ? "bg-blue-50"
                                : ""
                            }`}
                    >
                        {tasks.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 py-10"
                            >
                                <p className="text-sm text-slate-400">
                                    Drop tasks here
                                </p>
                            </motion.div>
                        )}

                        {tasks.map((task, index) => (
                            <TaskCard
                                key={task._id}
                                index={index}
                                workspaceId={workspaceId}
                                projectId={projectId}
                                task={task}
                            />
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <TaskModal
                open={openModal}
                workspaceId={workspaceId}
                projectId={projectId}
                defaultStatus={status}
                onClose={() => setOpenModal(false)}
            />
        </div>
    );
};

export default TaskColumn;