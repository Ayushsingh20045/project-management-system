// // import { useEffect, useState } from "react";
// // import { Plus } from "lucide-react";

// // import api from "../services/api";
// // import MainLayout from "../layouts/MainLayout";

// // import WorkspaceCard from "../components/workspace/WorkspaceCard";
// // import WorkspaceSkeleton from "../components/workspace/WorkspaceSkeleton";

// // import type { Workspace } from "../types/workspace";
// // import WorkspaceModal from "../components/workspace/WorkspaceModal";

// // const WorkspacePage = () => {
// //     const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [openModal, setOpenModal] = useState(false);

// //     const fetchWorkspaces = async () => {
// //         try {
// //             setLoading(true);

// //             const res = await api.get("/workspaces");

// //             setWorkspaces(res.data.workspaces);
// //         } catch (error) {
// //             console.log(error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchWorkspaces(); 
// //     }, []);

// //     return (
// //         <MainLayout>

// //             <div className="mb-8 flex items-center justify-between">

// //                 <h1 className="text-3xl font-bold">
// //                     Workspaces
// //                 </h1>

// //                 <button
// //                     onClick={() => setOpenModal(true)}
// //                     className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
// //                 >
// //                     <Plus size={18} />

// //                     New Workspace
// //                 </button>

// //             </div>

// //             <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

// //                 {loading ? (
// //                     Array.from({ length: 6 }).map((_, index) => (
// //                         <WorkspaceSkeleton key={index} />
// //                     ))
// //                 ) : (
// //                     workspaces.map((workspace) => (
// //                         <WorkspaceCard
// //                             key={workspace._id}
// //                             workspace={workspace}
// //                         />
// //                     ))
// //                 )}


// //             </div>
// //             <WorkspaceModal
// //                 open={openModal}
// //                 onClose={() => setOpenModal(false)}
// //                 onCreated={fetchWorkspaces}
// //             />
// //         </MainLayout>
// //     );
// // };

// // export default WorkspacePage;

// import { useEffect, useState } from "react";
// import { Plus } from "lucide-react";
// import toast from "react-hot-toast";

// import api from "../services/api";
// import MainLayout from "../layouts/MainLayout";

// import WorkspaceCard from "../components/workspace/WorkspaceCard";
// import WorkspaceModal from "../components/workspace/WorkspaceModal";
// import DeleteWorkspaceModal from "../components/workspace/DeleteWorkspaceModal";
// import WorkspaceSkeleton from "../components/workspace/WorkspaceSkeleton";
// import EmptyWorkspace from "../components/workspace/EmptyWorkspace";

// import type { Workspace } from "../types/workspace";

// const WorkspacePage = () => {
//     const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
//     const [loading, setLoading] = useState(true);

//     const [createModalOpen, setCreateModalOpen] =
//         useState(false);

//     const [editingWorkspace, setEditingWorkspace] =
//         useState<Workspace | null>(null);

//     const [deleteWorkspace, setDeleteWorkspace] =
//         useState<Workspace | null>(null);

//     const fetchWorkspaces = async () => {
//         try {
//             setLoading(true);

//             const res = await api.get("/workspaces");

//             setWorkspaces(res.data.workspaces);
//         } catch (error) {
//             console.log(error);

//             toast.error("Failed to load workspaces");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchWorkspaces();
//     }, []);

//     return (
//         <MainLayout>
//             <div className="mb-8 flex items-center justify-between">
//                 <div>
//                     <h1 className="text-3xl font-bold text-slate-800">
//                         Workspaces
//                     </h1>

//                     <p className="mt-2 text-slate-500">
//                         Organize all your projects in one place.
//                     </p>
//                 </div>

//                 <button
//                     onClick={() => setCreateModalOpen(true)}
//                     className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
//                 >
//                     <Plus size={18} />

//                     New Workspace
//                 </button>
//             </div>

//             {loading ? (
//                 <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//                     {Array.from({ length: 6 }).map((_, index) => (
//                         <WorkspaceSkeleton key={index} />
//                     ))}
//                 </div>
//             ) : workspaces.length === 0 ? (
//                 <EmptyWorkspace
//                     onCreate={() => setCreateModalOpen(true)}
//                 />
//             ) : (
//                 <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//                     {workspaces.map((workspace) => (
//                         <WorkspaceCard
//                             key={workspace._id}
//                             workspace={workspace}
//                             onEdit={(workspace) =>
//                                 setEditingWorkspace(workspace)
//                             }
//                             onDelete={(workspace) =>
//                                 setDeleteWorkspace(workspace)
//                             }
//                         />
//                     ))}
//                 </div>
//             )}

//             <WorkspaceModal
//                 open={createModalOpen}
//                 onClose={() => setCreateModalOpen(false)}
//                 onSuccess={fetchWorkspaces}
//             />

//             <WorkspaceModal
//                 open={editingWorkspace !== null}
//                 workspace={editingWorkspace}
//                 onClose={() => setEditingWorkspace(null)}
//                 onSuccess={() => {
//                     setEditingWorkspace(null);
//                     fetchWorkspaces();
//                 }}
//             />

//             <DeleteWorkspaceModal
//                 workspace={deleteWorkspace}
//                 onClose={() => setDeleteWorkspace(null)}
//                 onSuccess={() => {
//                     setDeleteWorkspace(null);
//                     fetchWorkspaces();
//                 }}
//             />
//         </MainLayout>
//     );
// };

// export default WorkspacePage;

import { useEffect, useState } from "react";
import { Plus, FolderKanban } from "lucide-react";
import toast from "react-hot-toast";

import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

import WorkspaceCard from "../components/workspace/WorkspaceCard";
import WorkspaceModal from "../components/workspace/WorkspaceModal";
import DeleteWorkspaceModal from "../components/workspace/DeleteWorkspaceModal";
import WorkspaceSkeleton from "../components/workspace/WorkspaceSkeleton";
import EmptyWorkspace from "../components/workspace/EmptyWorkspace";

import type { Workspace } from "../types/workspace";

const WorkspacePage = () => {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [loading, setLoading] = useState(true);

    const [createModalOpen, setCreateModalOpen] =
        useState(false);

    const [editingWorkspace, setEditingWorkspace] =
        useState<Workspace | null>(null);

    const [deleteWorkspace, setDeleteWorkspace] =
        useState<Workspace | null>(null);

    const fetchWorkspaces = async () => {
        try {
            setLoading(true);

            const res = await api.get("/workspaces");

            setWorkspaces(res.data.workspaces);
        } catch (error) {
            console.log(error);

            toast.error("Failed to load workspaces");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkspaces();
    }, []);

    return (
        <MainLayout>
            <div className="space-y-8">

                {/* Hero Section */}
                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-xl sm:p-8">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex items-start gap-4">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                                <FolderKanban size={34} />
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold sm:text-4xl">
                                    Workspaces
                                </h1>

                                <p className="mt-2 max-w-xl text-sm text-blue-100 sm:text-base">
                                    Organize teams, manage projects and
                                    collaborate efficiently across all your
                                    workspaces.
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={() =>
                                setCreateModalOpen(true)
                            }
                            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                        >
                            <Plus size={20} />

                            New Workspace
                        </button>

                    </div>

                </div>

                {/* Workspace Grid */}

                {loading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <WorkspaceSkeleton key={index} />
                        ))}
                    </div>
                ) : workspaces.length === 0 ? (
                    <EmptyWorkspace
                        onCreate={() =>
                            setCreateModalOpen(true)
                        }
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                        {workspaces.map((workspace) => (
                            <WorkspaceCard
                                key={workspace._id}
                                workspace={workspace}
                                onEdit={setEditingWorkspace}
                                onDelete={setDeleteWorkspace}
                            />
                        ))}
                    </div>
                )}

                <WorkspaceModal
                    open={createModalOpen}
                    onClose={() =>
                        setCreateModalOpen(false)
                    }
                    onSuccess={fetchWorkspaces}
                />

                <WorkspaceModal
                    open={editingWorkspace !== null}
                    workspace={editingWorkspace}
                    onClose={() =>
                        setEditingWorkspace(null)
                    }
                    onSuccess={() => {
                        setEditingWorkspace(null);
                        fetchWorkspaces();
                    }}
                />

                <DeleteWorkspaceModal
                    workspace={deleteWorkspace}
                    onClose={() =>
                        setDeleteWorkspace(null)
                    }
                    onSuccess={() => {
                        setDeleteWorkspace(null);
                        fetchWorkspaces();
                    }}
                />

            </div>
        </MainLayout>
    );
};

export default WorkspacePage;