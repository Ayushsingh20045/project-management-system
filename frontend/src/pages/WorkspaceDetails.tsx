import { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

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

    const [workspace, setWorkspace] = useState<Workspace | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);

    const [editingProject, setEditingProject] =
        useState<Project | null>(null);

    const [deleteProject, setDeleteProject] =
        useState<Project | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);

            const [workspaceRes, projectsRes] =
                await Promise.all([
                    api.get(`/workspaces/${workspaceId}`),
                    api.get(`/workspaces/${workspaceId}/projects`),
                ]);

            setWorkspace(workspaceRes.data.workspace);

            setProjects(projectsRes.data.projects);
        } catch (error) {
            console.log(error);

            toast.error("Failed to load workspace.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [workspaceId]);

    return (
        <MainLayout>
            <Link
                to="/workspaces"
                className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-blue-600"
            >
                <ArrowLeft size={18} />

                Back to Workspaces
            </Link>

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {workspace?.name}
                    </h1>

                    <p className="mt-2 text-slate-500">
                        {workspace?.description}
                    </p>
                </div>

                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    <Plus size={18} />

                    New Project
                </button>
            </div>

            {loading ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <ProjectSkeleton key={i} />
                    ))}
                </div>
            ) : projects.length === 0 ? (
                <EmptyProject
                    onCreate={() => setOpenModal(true)}
                />
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            workspaceId={workspaceId!}
                            onEdit={setEditingProject}
                            onDelete={setDeleteProject}
                        />
                    ))}
                </div>
            )}

            <ProjectModal
                open={openModal}
                workspaceId={workspaceId!}
                onClose={() => setOpenModal(false)}
                onSuccess={fetchData}
            />

            <ProjectModal
                open={editingProject !== null}
                workspaceId={workspaceId!}
                project={editingProject}
                onClose={() => setEditingProject(null)}
                onSuccess={() => {
                    setEditingProject(null);
                    fetchData();
                }}
            />

            <DeleteProjectModal
                workspaceId={workspaceId!}
                project={deleteProject}
                onClose={() => setDeleteProject(null)}
                onSuccess={() => {
                    setDeleteProject(null);
                    fetchData();
                }}
            />
        </MainLayout>
    );
};

export default WorkspaceDetails;