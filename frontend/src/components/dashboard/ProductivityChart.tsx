// import {
//     ResponsiveContainer,
//     AreaChart,
//     Area,
//     XAxis,
//     Tooltip,
// } from "recharts";

// const data = [
//     { day: "Mon", tasks: 3 },
//     { day: "Tue", tasks: 6 },
//     { day: "Wed", tasks: 4 },
//     { day: "Thu", tasks: 8 },
//     { day: "Fri", tasks: 5 },
//     { day: "Sat", tasks: 7 },
//     { day: "Sun", tasks: 4 },
// ];

// const ProductivityChart = () => {
//     return (
//         <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
//             <div className="mb-6">
//                 <h2 className="text-lg font-bold">
//                     Weekly Productivity
//                 </h2>

//                 <p className="text-sm text-slate-500">
//                     Tasks completed this week
//                 </p>
//             </div>

//             <div className="h-72">
//                 <ResponsiveContainer
//                     width="100%"
//                     height="100%"
//                 >
//                     <AreaChart data={data}>
//                         <XAxis dataKey="day" />

//                         <Tooltip />

//                         <Area
//                             type="monotone"
//                             dataKey="tasks"
//                             stroke="#2563eb"
//                             fill="#bfdbfe"
//                         />
//                     </AreaChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default ProductivityChart;

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import type { WeeklyProductivity } from "../../types/dashboard";

interface Props {
    data: WeeklyProductivity[];
}

const weekOrder = [
    { id: 2, label: "Mon" },
    { id: 3, label: "Tue" },
    { id: 4, label: "Wed" },
    { id: 5, label: "Thu" },
    { id: 6, label: "Fri" },
    { id: 7, label: "Sat" },
    { id: 1, label: "Sun" },
];

const ProductivityChart = ({ data }: Props) => {
    const chartData = weekOrder.map((day) => {
        const found = data.find(
            (item) => item._id === day.id
        );

        return {
            day: day.label,
            tasks: found ? found.tasks : 0,
        };
    });

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                    Weekly Productivity
                </h2>

                <p className="text-sm text-slate-500">
                    Completed tasks during the last 7 days
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient
                                id="colorTasks"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#2563eb"
                                    stopOpacity={0.4}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#2563eb"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            allowDecimals={false}
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="tasks"
                            stroke="#2563eb"
                            strokeWidth={3}
                            fill="url(#colorTasks)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProductivityChart;