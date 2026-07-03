// import {
//     CheckCircle2,
//     FolderKanban,
//     ListTodo,
//     Pencil,
// } from "lucide-react";

// const activities = [
//     {
//         icon: CheckCircle2,
//         title: "Completed Login Module",
//         color: "text-green-600",
//     },
//     {
//         icon: FolderKanban,
//         title: "Created Marketing Workspace",
//         color: "text-blue-600",
//     },
//     {
//         icon: Pencil,
//         title: "Updated Employee Tracker",
//         color: "text-yellow-600",
//     },
//     {
//         icon: ListTodo,
//         title: "Added new Task",
//         color: "text-purple-600",
//     },
// ];

// const RecentActivity = () => {
//     return (
//         <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
//             <h2 className="mb-6 text-lg font-bold">
//                 Recent Activity
//             </h2>

//             <div className="space-y-5">
//                 {activities.map((item, index) => {
//                     const Icon = item.icon;

//                     return (
//                         <div
//                             key={index}
//                             className="flex items-center gap-4"
//                         >
//                             <div
//                                 className={`rounded-xl bg-slate-100 p-3 ${item.color}`}
//                             >
//                                 <Icon size={18} />
//                             </div>

//                             <div>
//                                 <h4 className="font-medium">
//                                     {item.title}
//                                 </h4>

//                                 <p className="text-sm text-slate-500">
//                                     Just now
//                                 </p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default RecentActivity;

import {
    CheckCircle2,
    CircleDashed,
    ListTodo,
    Clock3,
} from "lucide-react";

import type { Activity } from "../../types/dashboard";

interface Props {
    activity: Activity[];
}

const RecentActivity = ({ activity }: Props) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Done":
                return (
                    <CheckCircle2
                        className="text-emerald-600"
                        size={20}
                    />
                );

            case "In Progress":
                return (
                    <CircleDashed
                        className="text-blue-600"
                        size={20}
                    />
                );

            case "Todo":
                return (
                    <ListTodo
                        className="text-amber-600"
                        size={20}
                    />
                );

            default:
                return (
                    <Clock3
                        className="text-slate-500"
                        size={20}
                    />
                );
        }
    };

    if (activity.length === 0) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-bold">
                    Recent Activity
                </h2>

                <div className="flex h-72 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200">
                    <div className="text-center">
                        <Clock3
                            size={42}
                            className="mx-auto mb-3 text-slate-300"
                        />

                        <h3 className="font-semibold text-slate-700">
                            No Activity Yet
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Activity will appear as you create and
                            update tasks.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">
                    Recent Activity
                </h2>

                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {activity.length}
                </span>
            </div>

            <div className="space-y-5">
                {activity.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                            {getStatusIcon(item.status)}
                        </div>

                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-800">
                                {item.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Project:{" "}
                                <span className="font-medium">
                                    {item.project}
                                </span>
                            </p>

                            <p className="mt-2 text-xs text-slate-400">
                                {new Date(
                                    item.updatedAt
                                ).toLocaleString()}
                            </p>
                        </div>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Done"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : item.status ===
                                        "In Progress"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-amber-100 text-amber-700"
                                }`}
                        >
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;