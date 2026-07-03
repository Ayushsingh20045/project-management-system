import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Users } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/api";

import AddMemberModal from "./AddMemberModal";
import MemberCard from "./MemberCard";

interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface Props {
    workspaceId: string;
}

const WorkspaceMembers = ({ workspaceId }: Props) => {
    const [members, setMembers] = useState<User[]>([]);
    const [owner, setOwner] = useState<User | null>(null);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const fetchMembers = async () => {
        try {
            setLoading(true);

            const res = await api.get(
                `/workspaces/${workspaceId}/members`
            );

            setMembers(res.data.members);
            setOwner(res.data.owner);
        } catch (error) {
            console.log(error);

            toast.error("Failed to load members");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [workspaceId]);

    const filteredMembers = useMemo(() => {
        return members.filter((member) => {
            return (
                member.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                member.email
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        });
    }, [members, search]);

    return (
        <div className="space-y-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                        <Users size={28} />

                        Members
                    </h2>

                    <p className="mt-2 text-slate-500">
                        {members.length} workspace members
                    </p>

                </div>

                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />

                    Add Member
                </button>

            </div>

            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                />

                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search members..."
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                />

            </div>

            {loading ? (
                <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                    Loading members...
                </div>
            ) : filteredMembers.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
                    <Users
                        size={40}
                        className="mx-auto text-slate-400"
                    />

                    <h3 className="mt-4 text-lg font-semibold">
                        No members found
                    </h3>

                    <p className="mt-2 text-slate-500">
                        Invite someone to your workspace.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5">

                    {filteredMembers.map((member) => (
                        <MemberCard
                            key={member._id}
                            member={member}
                            workspaceId={workspaceId}
                            isOwner={
                                owner?._id === member._id
                            }
                            onRemoved={fetchMembers}
                        />
                    ))}

                </div>
            )}

            <AddMemberModal
                open={openModal}
                workspaceId={workspaceId}
                onClose={() =>
                    setOpenModal(false)
                }
                onAdded={() => {
                    setOpenModal(false);
                    fetchMembers();
                }}
            />

        </div>
    );
};

export default WorkspaceMembers;