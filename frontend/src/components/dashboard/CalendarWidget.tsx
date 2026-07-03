import { useState } from "react";
import Calendar from "react-calendar";
import { CalendarDays } from "lucide-react";

import "react-calendar/dist/Calendar.css";

type Value = Date | [Date, Date] | null;

const CalendarWidget = () => {
    const [value, setValue] = useState<Value>(new Date());

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
                <CalendarDays className="text-blue-600" />

                <div>
                    <h2 className="text-lg font-bold text-slate-800">
                        Calendar
                    </h2>

                    <p className="text-sm text-slate-500">
                        Keep track of your schedule
                    </p>
                </div>
            </div>

            <Calendar
                value={value}
                onChange={(value) => setValue(value)}
                className="w-full rounded-2xl border-none"
            />
        </div>
    );
};

export default CalendarWidget;