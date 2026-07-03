// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     ResponsiveContainer,
// } from "recharts";

// const COLORS = [
//     "#2563eb",
//     "#f59e0b",
//     "#10b981",
//     "#ef4444",
// ];

// interface Props {
//     todo: number;
//     progress: number;
//     done: number;
//     overdue: number;
// }

// const TaskStatusChart = ({
//     todo,
//     progress,
//     done,
//     overdue,
// }: Props) => {
//     const data = [
//         { name: "Todo", value: todo },
//         {
//             name: "In Progress",
//             value: progress,
//         },
//         {
//             name: "Done",
//             value: done,
//         },
//         {
//             name: "Overdue",
//             value: overdue,
//         },
//     ];

//     return (
//         <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
//             <h2 className="mb-6 text-lg font-bold">
//                 Task Status
//             </h2>

//             <div className="h-72">
//                 <ResponsiveContainer>
//                     <PieChart>
//                         <Pie
//                             data={data}
//                             outerRadius={90}
//                             dataKey="value"
//                             label
//                         >
//                             {data.map((_, index) => (
//                                 <Cell
//                                     key={index}
//                                     fill={COLORS[index]}
//                                 />
//                             ))}
//                         </Pie>

//                         <Tooltip />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default TaskStatusChart;

import {
    FolderKanban,
    Plus,
    ListTodo,
    Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        {
            title: "New Workspace",
            icon: FolderKanban,
            color: "bg-blue-600",
            onClick: () => navigate("/workspaces"),
        },
        {
            title: "New Project",
            icon: Plus,
            color: "bg-green-600",
            onClick: () => navigate("/workspaces"),
        },
        {
            title: "My Tasks",
            icon: ListTodo,
            color: "bg-purple-600",
            onClick: () => navigate("/workspaces"),
        },
        {
            title: "Members",
            icon: Users,
            color: "bg-orange-500",
            onClick: () => navigate("/workspaces"),
        },
    ];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-slate-800">
                Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <button
                            key={action.title}
                            onClick={action.onClick}
                            className="group rounded-xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                        >
                            <div
                                className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${action.color}`}
                            >
                                <Icon
                                    size={22}
                                    className="text-white"
                                />
                            </div>

                            <p className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
                                {action.title}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickActions;