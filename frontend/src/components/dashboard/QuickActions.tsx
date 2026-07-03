import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#2563eb",
    "#f59e0b",
    "#10b981",
    "#ef4444",
];

interface Props {
    todo: number;
    progress: number;
    done: number;
    overdue: number;
}

const TaskStatusChart = ({
    todo,
    progress,
    done,
    overdue,
}: Props) => {
    const data = [
        { name: "Todo", value: todo },
        {
            name: "In Progress",
            value: progress,
        },
        {
            name: "Done",
            value: done,
        },
        {
            name: "Overdue",
            value: overdue,
        },
    ];

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold">
                Task Status
            </h2>

            <div className="h-72">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            outerRadius={90}
                            dataKey="value"
                            label
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TaskStatusChart;