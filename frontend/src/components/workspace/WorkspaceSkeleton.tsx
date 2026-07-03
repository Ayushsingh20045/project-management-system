// import Skeleton from "../ui/Skeleton";

// const WorkspaceSkeleton = () => {
//     return (
//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//             <Skeleton className="h-6 w-40" />

//             <Skeleton className="mt-4 h-4 w-full" />

//             <Skeleton className="mt-2 h-4 w-3/4" />

//             <div className="mt-8 flex justify-between">

//                 <Skeleton className="h-4 w-20" />

//                 <Skeleton className="h-4 w-16" />

//             </div>

//         </div>
//     );
// };

// export default WorkspaceSkeleton;

import Skeleton from "../ui/Skeleton";

const WorkspaceSkeleton = () => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <Skeleton className="h-6 w-40 rounded-lg" />

            <Skeleton className="mt-4 h-4 w-full rounded-lg" />

            <Skeleton className="mt-2 h-4 w-3/4 rounded-lg" />

            <div className="mt-8 flex items-center justify-between">

                <Skeleton className="h-4 w-24 rounded-lg" />

                <Skeleton className="h-4 w-16 rounded-lg" />

            </div>

        </div>
    );
};

export default WorkspaceSkeleton;