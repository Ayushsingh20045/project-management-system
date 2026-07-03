import Skeleton from "../ui/Skeleton";

const StatCardSkeleton = () => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex justify-between">

                <Skeleton className="h-4 w-28" />

                <Skeleton className="h-6 w-6 rounded-full" />

            </div>

            <Skeleton className="h-10 w-20" />

        </div>
    );
};

export default StatCardSkeleton;