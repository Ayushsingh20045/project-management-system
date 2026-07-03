// // // import { useEffect } from "react";

// // // import { useTaskStore } from "../../store/taskStore";

// // // import TaskColumn from "./TaskColumn";
// // // import TaskSkeleton from "./TaskSkeleton";
// // // import EmptyTask from "./EmptyTask";

// // // interface Props {
// // //     workspaceId: string;
// // //     projectId: string;
// // // }

// // // const KanbanBoard = ({
// // //     workspaceId,
// // //     projectId,
// // // }: Props) => {
// // //     const {
// // //         tasks,
// // //         loading,
// // //         fetchTasks,
// // //     } = useTaskStore();

// // //     useEffect(() => {
// // //         fetchTasks(workspaceId, projectId);
// // //     }, [workspaceId, projectId]);

// // //     if (loading) {
// // //         return (
// // //             <div className="grid gap-6 lg:grid-cols-3">
// // //                 <TaskSkeleton />
// // //                 <TaskSkeleton />
// // //                 <TaskSkeleton />
// // //             </div>
// // //         );
// // //     }

// // //     if (!loading && tasks.length === 0) {
// // //         return (
// // //             <EmptyTask
// // //                 workspaceId={workspaceId}
// // //                 projectId={projectId}
// // //             />
// // //         );
// // //     }

// // //     return (
// // //         <div className="grid gap-6 lg:grid-cols-3">
// // //             <TaskColumn
// // //                 title="Todo"
// // //                 status="Todo"
// // //                 workspaceId={workspaceId}
// // //                 projectId={projectId}
// // //                 tasks={tasks.filter(
// // //                     (task) => task.status === "Todo"
// // //                 )}
// // //             />

// // //             <TaskColumn
// // //                 title="In Progress"
// // //                 status="In Progress"
// // //                 workspaceId={workspaceId}
// // //                 projectId={projectId}
// // //                 tasks={tasks.filter(
// // //                     (task) => task.status === "In Progress"
// // //                 )}
// // //             />

// // //             <TaskColumn
// // //                 title="Done"
// // //                 status="Done"
// // //                 workspaceId={workspaceId}
// // //                 projectId={projectId}
// // //                 tasks={tasks.filter(
// // //                     (task) => task.status === "Done"
// // //                 )}
// // //             />
// // //         </div>
// // //     );
// // // };

// // // export default KanbanBoard;

// // import { useEffect } from "react";
// // import {
// //     DndContext,
// //     closestCorners,
// //     type DragEndEvent,
// // } from "@dnd-kit/core";

// // import { useTaskStore } from "../../store/taskStore";

// // import TaskColumn from "./TaskColumn";
// // import TaskSkeleton from "./TaskSkeleton";
// // import EmptyTask from "./EmptyTask";

// // interface Props {
// //     workspaceId: string;
// //     projectId: string;
// // }

// // const KanbanBoard = ({
// //     workspaceId,
// //     projectId,
// // }: Props) => {
// //     const {
// //         tasks,
// //         loading,
// //         fetchTasks,
// //         moveTask,
// //     } = useTaskStore();

// //     useEffect(() => {
// //         fetchTasks(workspaceId, projectId);
// //     }, [workspaceId, projectId]);

// //     const handleDragEnd = async (
// //         event: DragEndEvent
// //     ) => {
// //         const { active, over } = event;

// //         if (!over) return;

// //         const activeTask = tasks.find(
// //             (task) => task._id === active.id
// //         );

// //         if (!activeTask) return;

// //         let newStatus = activeTask.status;

// //         // Dropped on a column
// //         if (
// //             over.id === "Todo" ||
// //             over.id === "In Progress" ||
// //             over.id === "Done"
// //         ) {
// //             newStatus = over.id as typeof activeTask.status;
// //         } else {
// //             // Dropped on another task
// //             const overTask = tasks.find(
// //                 (task) => task._id === over.id
// //             );

// //             if (!overTask) return;

// //             newStatus = overTask.status;
// //         }

// //         if (newStatus === activeTask.status) return;

// //         await moveTask(
// //             workspaceId,
// //             projectId,
// //             activeTask._id,
// //             newStatus
// //         );
// //     };

// //     if (loading) {
// //         return (
// //             <div className="grid gap-6 lg:grid-cols-3">
// //                 <TaskSkeleton />
// //                 <TaskSkeleton />
// //                 <TaskSkeleton />
// //             </div>
// //         );
// //     }

// //     if (tasks.length === 0) {
// //         return (
// //             <EmptyTask
// //                 workspaceId={workspaceId}
// //                 projectId={projectId}
// //             />
// //         );
// //     }

// //     return (
// //         <DndContext
// //             collisionDetection={closestCorners}
// //             onDragEnd={handleDragEnd}
// //         >
// //             <div className="grid gap-6 lg:grid-cols-3">
// //                 <TaskColumn
// //                     title="Todo"
// //                     status="Todo"
// //                     workspaceId={workspaceId}
// //                     projectId={projectId}
// //                     tasks={tasks.filter(
// //                         (task) => task.status === "Todo"
// //                     )}
// //                 />

// //                 <TaskColumn
// //                     title="In Progress"
// //                     status="In Progress"
// //                     workspaceId={workspaceId}
// //                     projectId={projectId}
// //                     tasks={tasks.filter(
// //                         (task) => task.status === "In Progress"
// //                     )}
// //                 />

// //                 <TaskColumn
// //                     title="Done"
// //                     status="Done"
// //                     workspaceId={workspaceId}
// //                     projectId={projectId}
// //                     tasks={tasks.filter(
// //                         (task) => task.status === "Done"
// //                     )}
// //                 />
// //             </div>
// //         </DndContext>
// //     );
// // };

// // export default KanbanBoard;

// import { useEffect } from "react";
// import {
//     DragDropContext,
//     type DropResult,
// } from "@hello-pangea/dnd";

// import { useTaskStore } from "../../store/taskStore";

// import TaskColumn from "./TaskColumn";
// import TaskSkeleton from "./TaskSkeleton";
// import EmptyTask from "./EmptyTask";

// import type { Task } from "../../types/task";

// interface Props {
//     workspaceId: string;
//     projectId: string;
// }

// const KanbanBoard = ({
//     workspaceId,
//     projectId,
// }: Props) => {
//     const {
//         tasks,
//         loading,
//         fetchTasks,
//         setTasks,
//         moveTask,
//     } = useTaskStore();

//     useEffect(() => {
//         fetchTasks(workspaceId, projectId);
//     }, [workspaceId, projectId]);

//     const handleDragEnd = async (
//         result: DropResult
//     ) => {
//         const { destination, source, draggableId } = result;

//         if (!destination) return;

//         // dropped in same column
//         if (
//             source.droppableId === destination.droppableId
//         ) {
//             return;
//         }

//         const updatedTasks: Task[] = tasks.map((task) =>
//             task._id === draggableId
//                 ? {
//                     ...task,
//                     status: destination.droppableId as Task["status"],
//                 }
//                 : task
//         );

//         // Optimistic UI
//         setTasks(updatedTasks);

//         try {
//             await moveTask(
//                 workspaceId,
//                 projectId,
//                 draggableId,
//                 destination.droppableId as Task["status"]
//             );
//         } catch {
//             // rollback
//             setTasks(tasks);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="grid gap-6 lg:grid-cols-3">
//                 <TaskSkeleton />
//                 <TaskSkeleton />
//                 <TaskSkeleton />
//             </div>
//         );
//     }

//     if (tasks.length === 0) {
//         return (
//             <EmptyTask
//                 workspaceId={workspaceId}
//                 projectId={projectId}
//             />
//         );
//     }

//     return (
//         <DragDropContext onDragEnd={handleDragEnd}>
//             <div className="grid gap-6 lg:grid-cols-3">
//                 <TaskColumn
//                     title="Todo"
//                     droppableId="Todo"
//                     status="Todo"
//                     workspaceId={workspaceId}
//                     projectId={projectId}
//                     tasks={tasks.filter(
//                         (task) => task.status === "Todo"
//                     )}
//                 />

//                 <TaskColumn
//                     title="In Progress"
//                     droppableId="In Progress"
//                     status="In Progress"
//                     workspaceId={workspaceId}
//                     projectId={projectId}
//                     tasks={tasks.filter(
//                         (task) => task.status === "In Progress"
//                     )}
//                 />

//                 <TaskColumn
//                     title="Done"
//                     droppableId="Done"
//                     status="Done"
//                     workspaceId={workspaceId}
//                     projectId={projectId}
//                     tasks={tasks.filter(
//                         (task) => task.status === "Done"
//                     )}
//                 />
//             </div>
//         </DragDropContext>
//     );
// };

// export default KanbanBoard;

import { useEffect } from "react";
import {
    DragDropContext,
    type DropResult,
} from "@hello-pangea/dnd";

import { useTaskStore } from "../../store/taskStore";

import TaskColumn from "./TaskColumn";
import TaskSkeleton from "./TaskSkeleton";
import EmptyTask from "./EmptyTask";

import type { Task } from "../../types/task";

interface Props {
    workspaceId: string;
    projectId: string;
}

const KanbanBoard = ({
    workspaceId,
    projectId,
}: Props) => {
    const {
        tasks,
        loading,
        fetchTasks,
        setTasks,
        moveTask,
    } = useTaskStore();

    useEffect(() => {
        fetchTasks(workspaceId, projectId);
    }, [workspaceId, projectId]);

    const handleDragEnd = async (
        result: DropResult
    ) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            source.droppableId ===
            destination.droppableId
        ) {
            return;
        }

        const updatedTasks: Task[] = tasks.map((task) =>
            task._id === draggableId
                ? {
                    ...task,
                    status:
                        destination.droppableId as Task["status"],
                }
                : task
        );

        setTasks(updatedTasks);

        try {
            await moveTask(
                workspaceId,
                projectId,
                draggableId,
                destination.droppableId as Task["status"]
            );
        } catch {
            setTasks(tasks);
        }
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <TaskSkeleton />
                <TaskSkeleton />
                <TaskSkeleton />
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <EmptyTask
                workspaceId={workspaceId}
                projectId={projectId}
            />
        );
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {/* Mobile + Tablet Scroll */}
            <div className="-mx-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:px-0">
                <div className="flex min-w-max gap-6 lg:grid lg:min-w-0 lg:grid-cols-3">

                    <div className="w-[340px] lg:w-auto">
                        <TaskColumn
                            title="Todo"
                            droppableId="Todo"
                            status="Todo"
                            workspaceId={workspaceId}
                            projectId={projectId}
                            tasks={tasks.filter(
                                (task) =>
                                    task.status ===
                                    "Todo"
                            )}
                        />
                    </div>

                    <div className="w-[340px] lg:w-auto">
                        <TaskColumn
                            title="In Progress"
                            droppableId="In Progress"
                            status="In Progress"
                            workspaceId={workspaceId}
                            projectId={projectId}
                            tasks={tasks.filter(
                                (task) =>
                                    task.status ===
                                    "In Progress"
                            )}
                        />
                    </div>

                    <div className="w-[340px] lg:w-auto">
                        <TaskColumn
                            title="Done"
                            droppableId="Done"
                            status="Done"
                            workspaceId={workspaceId}
                            projectId={projectId}
                            tasks={tasks.filter(
                                (task) =>
                                    task.status ===
                                    "Done"
                            )}
                        />
                    </div>

                </div>
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;