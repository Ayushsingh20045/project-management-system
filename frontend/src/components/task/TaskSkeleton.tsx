import Skeleton from "../ui/Skeleton";

const TaskSkeleton = () => {
    return (
        <div className="rounded-2xl bg-slate-100 p-4">

            <Skeleton className="mb-4 h-6 w-36 rounded-lg" />

            <div className="space-y-4">

                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="rounded-xl bg-white p-4"
                    >
                        <Skeleton className="h-5 w-32 rounded-lg" />

                        <Skeleton className="mt-3 h-4 w-full rounded-lg" />

                        <Skeleton className="mt-2 h-4 w-2/3 rounded-lg" />

                        <div className="mt-5 flex justify-between">

                            <Skeleton className="h-6 w-20 rounded-full" />

                            <Skeleton className="h-5 w-16 rounded-lg" />

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default TaskSkeleton;