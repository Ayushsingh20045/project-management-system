import { Trash2, Crown, User } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/api";

interface Member {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface Props {
    workspaceId: string;
    member: Member;
    isOwner: boolean;
    onRemoved: () => void;
}

const MemberCard = ({
    workspaceId,
    member,
    isOwner,
    onRemoved,
}: Props) => {
    const initials = member.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const removeMember = async () => {
        if (isOwner) return;

        const confirmDelete = window.confirm(
            `Remove ${member.name} from workspace?`
        );

        if (!confirmDelete) return;

        try {
            await api.delete(
                `/workspaces/${workspaceId}/members/${member._id}`
            );

            toast.success("Member removed");

            onRemoved();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Failed to remove member"
            );
        }
    };

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

                {member.avatar ? (
                    <img
                        src={member.avatar}
                        alt={member.name}
                        className="h-14 w-14 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                        {initials}
                    </div>
                )}

                <div>

                    <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-semibold text-slate-800">
                            {member.name}
                        </h3>

                        {isOwner && (
                            <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                <Crown size={12} />
                                Owner
                            </span>
                        )}

                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                        {member.email}
                    </p>

                </div>

            </div>

            {!isOwner && (
                <button
                    onClick={removeMember}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50"
                >
                    <Trash2 size={16} />
                    Remove
                </button>
            )}

        </div>
    );
};

export default MemberCard;