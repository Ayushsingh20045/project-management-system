import {
    CalendarClock,
    AlertTriangle,
    Clock3,
} from "lucide-react";

import type { UpcomingDeadline } from "../../types/dashboard";

interface Props {
    deadlines: UpcomingDeadline[];
}

const UpcomingDeadlines = ({
    deadlines,
}: Props) => {
    const getPriorityColor = (
        priority: string
    ) => {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-600";

            case "Medium":
                return "bg-yellow-100 text-yellow-600";

            default:
                return "bg-green-100 text-green-600";
        }
    };

    const getRemainingDays = (
        dueDate: string
    ) => {
        const today = new Date();

        const due = new Date(dueDate);

        const diff = Math.ceil(
            (due.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        if (diff === 0) return "Today";

        if (diff === 1) return "Tomorrow";

        return `In ${diff} days`;
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

                <CalendarClock className="text-red-500" />

                <div>
                    <h2 className="text-lg font-bold">
                        Upcoming Deadlines
                    </h2>

                    <p className="text-sm text-slate-500">
                        Next tasks due
                    </p>
                </div>

            </div>

            {deadlines.length === 0 ? (
                <div className="flex h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200">

                    <Clock3
                        size={44}
                        className="mb-3 text-slate-300"
                    />

                    <h3 className="font-semibold text-slate-700">
                        No upcoming deadlines
                    </h3>

                    <p className="mt-2 text-center text-sm text-slate-500">
                        You're all caught up 🎉
                    </p>

                </div>
            ) : (
                <div className="space-y-4">

                    {deadlines.map((task) => (

                        <div
                            key={task._id}
                            className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
                        >

                            <div className="flex items-start gap-4">

                                <div
                                    className={`rounded-xl p-3 ${getPriorityColor(
                                        task.priority
                                    )}`}
                                >
                                    <AlertTriangle size={18} />
                                </div>

                                <div>

                                    <h3 className="font-semibold text-slate-800">
                                        {task.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {task.project}
                                    </p>

                                    <p className="mt-2 text-xs text-slate-400">
                                        {getRemainingDays(
                                            task.dueDate
                                        )}
                                    </p>

                                </div>

                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityColor(
                                    task.priority
                                )}`}
                            >
                                {task.priority}
                            </span>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
};

export default UpcomingDeadlines;