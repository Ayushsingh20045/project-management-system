

import { useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    Plus,
    Search,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import WorkspaceMembers from "../components/workspace/WorkspaceMembers.tsx";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

import ProjectCard from "../components/project/ProjectCard";
import ProjectModal from "../components/project/ProjectModal";
import DeleteProjectModal from "../components/project/DeleteProjectModal";
import ProjectSkeleton from "../components/project/ProjectSkeleton";
import EmptyProject from "../components/project/EmptyProject";

import type { Workspace } from "../types/workspace";
import type { Project } from "../types/project";

const WorkspaceDetails = () => {
    const { workspaceId } = useParams();

    const [workspace, setWorkspace] =
        useState<Workspace | null>(null);

    const [projects, setProjects] =
        useState<Project[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [openModal, setOpenModal] =
        useState(false);

    const [editingProject, setEditingProject] =
        useState<Project | null>(null);

    const [deleteProject, setDeleteProject] =
        useState<Project | null>(null);

    // Search

    const [search, setSearch] = useState("");

    // Filter

    const [filter, setFilter] = useState("All");

    // Sort

    const [sort, setSort] = useState("Newest");
    const [activeTab, setActiveTab] = useState<
        "projects" | "members"
    >("projects");

    const fetchData = async () => {
        try {
            setLoading(true);

            const [workspaceRes, projectsRes] =
                await Promise.all([
                    api.get(`/workspaces/${workspaceId}`),
                    api.get(
                        `/workspaces/${workspaceId}/projects`
                    ),
                ]);

            setWorkspace(
                workspaceRes.data.workspace
            );

            setProjects(
                projectsRes.data.projects
            );
        } catch (error) {
            console.log(error);

            toast.error(
                "Failed to load workspace."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [workspaceId]);

    const filteredProjects = useMemo(() => {
        let data = [...projects];

        // Search

        data = data.filter((project) =>
            project.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        // Filter

        switch (filter) {
            case "Completed":
                data = data.filter(
                    (p) => p.progress === 100
                );
                break;

            case "In Progress":
                data = data.filter(
                    (p) =>
                        p.progress > 0 &&
                        p.progress < 100
                );
                break;

            case "Empty":
                data = data.filter(
                    (p) => p.totalTasks === 0
                );
                break;
        }

        // Sort

        switch (sort) {
            case "Oldest":
                data.sort(
                    (a, b) =>
                        new Date(
                            a.createdAt
                        ).getTime() -
                        new Date(
                            b.createdAt
                        ).getTime()
                );
                break;

            case "A-Z":
                data.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
                break;

            case "Z-A":
                data.sort((a, b) =>
                    b.title.localeCompare(a.title)
                );
                break;

            case "Most Tasks":
                data.sort(
                    (a, b) =>
                        b.totalTasks - a.totalTasks
                );
                break;

            case "Highest Progress":
                data.sort(
                    (a, b) =>
                        b.progress - a.progress
                );
                break;

            default:
                data.sort(
                    (a, b) =>
                        new Date(
                            b.createdAt
                        ).getTime() -
                        new Date(
                            a.createdAt
                        ).getTime()
                );
        }

        return data;
    }, [projects, search, filter, sort]);

    return (
        <MainLayout>

            <Link
                to="/workspaces"
                className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-blue-600"
            >
                <ArrowLeft size={18} />
                Back to Workspaces
            </Link>

            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        {workspace?.name}
                    </h1>

                    <p className="mt-2 text-slate-500">
                        {workspace?.description}
                    </p>
                </div>

                <button
                    onClick={() =>
                        setOpenModal(true)
                    }
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    <Plus size={18} />

                    New Project
                </button>

            </div>

            {/* Search Filter Sort */}

            {/* Tabs */}

            <div className="mb-8">

                <div className="mb-6 flex gap-2 rounded-2xl bg-slate-100 p-2">

                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`rounded-xl px-6 py-3 font-medium transition ${activeTab === "projects"
                                ? "bg-white text-blue-600 shadow"
                                : "text-slate-500"
                            }`}
                    >
                        Projects
                    </button>

                    <button
                        onClick={() => setActiveTab("members")}
                        className={`rounded-xl px-6 py-3 font-medium transition ${activeTab === "members"
                                ? "bg-white text-blue-600 shadow"
                                : "text-slate-500"
                            }`}
                    >
                        Members
                    </button>

                </div>

                {activeTab === "projects" && (

                    <div className="grid gap-4 lg:grid-cols-3">

                        <div className="relative">

                            <Search
                                className="absolute left-4 top-3.5 text-slate-400"
                                size={18}
                            />

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search projects..."
                                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                            />

                        </div>

                        <select
                            value={filter}
                            onChange={(e) =>
                                setFilter(e.target.value)
                            }
                            className="rounded-xl border border-slate-300 px-4 py-3"
                        >
                            <option>All</option>
                            <option>Completed</option>
                            <option>In Progress</option>
                            <option>Empty</option>
                        </select>

                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                            className="rounded-xl border border-slate-300 px-4 py-3"
                        >
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>A-Z</option>
                            <option>Z-A</option>
                            <option>Most Tasks</option>
                            <option>Highest Progress</option>
                        </select>

                    </div>

                )}

            </div>

            {activeTab === "projects" ? (
                loading ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ProjectSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <EmptyProject
                        onCreate={() => setOpenModal(true)}
                    />
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                workspaceId={workspaceId!}
                                onEdit={setEditingProject}
                                onDelete={setDeleteProject}
                            />
                        ))}
                    </div>
                )
            ) : (
                <WorkspaceMembers workspaceId={workspaceId!} />
            )}

            <ProjectModal
                open={openModal}
                workspaceId={workspaceId!}
                onClose={() =>
                    setOpenModal(false)
                }
                onSuccess={fetchData}
            />

            <ProjectModal
                open={editingProject !== null}
                workspaceId={workspaceId!}
                project={editingProject}
                onClose={() =>
                    setEditingProject(null)
                }
                onSuccess={() => {
                    setEditingProject(null);
                    fetchData();
                }}
            />

            <DeleteProjectModal
                workspaceId={workspaceId!}
                project={deleteProject}
                onClose={() =>
                    setDeleteProject(null)
                }
                onSuccess={() => {
                    setDeleteProject(null);
                    fetchData();
                }}
            />

        </MainLayout>
    );
};

export default WorkspaceDetails;
