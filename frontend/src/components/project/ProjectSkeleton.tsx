import Skeleton from "../ui/Skeleton";

const ProjectSkeleton = () => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Skeleton className="h-2 w-full rounded-none" />

            <div className="p-6">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-10 rounded-lg" />

                        <div className="space-y-3">
                            <Skeleton className="h-5 w-40 rounded-lg" />
                            <Skeleton className="h-4 w-56 rounded-lg" />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                    <Skeleton className="h-4 w-24 rounded-lg" />

                    <Skeleton className="h-4 w-16 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default ProjectSkeleton;