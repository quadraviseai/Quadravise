import { useState } from "react";
import { motion } from "framer-motion";
import {
    MoreVertical,
    Clock,
    AlertCircle,
    Building2,
    User,
    Briefcase
} from "lucide-react";

const PRIORITY_STYLES = {
    Critical: "bg-red-50 text-red-700 border-red-200 ring-red-500/20",
    High: "bg-orange-50 text-orange-700 border-orange-200 ring-orange-500/20",
    Medium: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20",
    Low: "bg-neutral-50 text-neutral-600 border-neutral-200 ring-neutral-500/20",
};

export default function TaskCard({ task, onUpdateStatus, onEdit, onDelete }) {
    const [showMenu, setShowMenu] = useState(false);

    // SLA Calculation (Mock)
    const isOverdue = new Date(task.dueDate) < new Date();

    // Icon for Linked Entity
    const LinkIcon = task.linkedEntity?.type === 'Account' ? Building2
        : task.linkedEntity?.type === 'Contact' ? User
            : Briefcase;

    return (
        <motion.div
            layoutId={task.id}
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", JSON.stringify({ taskId: task.id, fromStatus: task.status }));
                e.dataTransfer.effectAllowed = "move";
            }}
            className={`group bg-white p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer relative ${task.priority === 'Critical' ? 'border-l-red-500' :
                task.priority === 'High' ? 'border-l-orange-500' :
                    task.priority === 'Medium' ? 'border-l-blue-500' : 'border-l-neutral-300'
                } border border-neutral-200`}
        >
            {/* Top Row: Chips & Menu */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold border ${PRIORITY_STYLES[task.priority]}`}>
                        {task.priority}
                    </span>
                    {task.type && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
                            {task.type}
                        </span>
                    )}
                </div>

                {/* Action Menu (Fixed from previous issues) */}
                <div className="relative">
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                        className="text-neutral-300 hover:text-neutral-600 p-1 rounded-md hover:bg-neutral-100"
                    >
                        <MoreVertical size={16} />
                    </button>

                    {showMenu && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setShowMenu(false); }} />
                            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-xl border border-neutral-100 z-20 py-1 overflow-hidden">
                                <button onClick={(e) => { e.stopPropagation(); onEdit(task); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50">Edit</button>
                                <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <h4 className="font-semibold text-neutral-800 mb-1 leading-snug">{task.title}</h4>

            {/* Linked Entity Hint */}
            {task.linkedEntity && (
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2">
                    <LinkIcon size={12} className="text-neutral-400" />
                    <span className="font-medium">{task.linkedEntity.name}</span>
                </div>
            )}

            <p className="text-neutral-500 text-xs mb-4 line-clamp-2">{task.description}</p>

            {/* Footer Info */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                    <img
                        src={`https://ui-avatars.com/api/?name=${task.assignee}&background=random`}
                        alt={task.assignee}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    />
                    <div className={`flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${isOverdue ? 'bg-red-50 text-red-600' : 'text-neutral-400'}`}>
                        {isOverdue ? <AlertCircle size={10} /> : <Clock size={10} />}
                        <span>{task.dueDate}</span>
                    </div>
                </div>

                {/* Quick Move Logic */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {task.status !== 'To Do' && (
                        <button title="Move Back" onClick={() => onUpdateStatus(task.id, 'Prev')} className="p-1 hover:bg-neutral-100 rounded text-neutral-400">←</button>
                    )}
                    {task.status !== 'Done' && (
                        <button title="Move Forward" onClick={() => onUpdateStatus(task.id, 'Next')} className="p-1 hover:bg-neutral-100 rounded text-neutral-400">→</button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
