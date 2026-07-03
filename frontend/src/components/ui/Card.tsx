import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

const Card = ({ children }: CardProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {children}
        </div>
    );
};

export default Card;