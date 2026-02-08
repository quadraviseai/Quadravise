import { motion } from "framer-motion";
import {
    CheckCircle2,
    Clock,
    AlertCircle,
    Calendar,
    MoreVertical,
    Building2,
    User,
    Briefcase
} from "lucide-react";
import { useState } from "react";

export default function TaskList({ tasks, onEdit, onDelete }) {
    const [openMenuId, setOpenMenuId] = useState(null);

    const StatusIcon = ({ status }) => {
        if (status === 'Completed') return <CheckCircle2 size={14} className="text-green-600" />;
        if (status === 'In Progress') return <Clock size={14} className="text-blue-600" />;
        return <AlertCircle size={14} className="text-amber-600" />;
    };

    const getPriorityColor = (p) => {
        if (p === 'Critical') return 'bg-red-50 text-red-700 border-red-200';
        if (p === 'High') return 'bg-orange-50 text-orange-700 border-orange-200';
        if (p === 'Medium') return 'bg-blue-50 text-blue-700 border-blue-200';
        return 'bg-neutral-50 text-neutral-600 border-neutral-200';
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-visible"
        >
            <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-50/50 border-b border-neutral-200 text-xs uppercase text-neutral-500 font-semibold tracking-wider sticky top-0">
                    <tr>
                        <th className="px-6 py-4 rounded-tl-xl">Task Name</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Priority</th>
                        <th className="px-6 py-4">Due Date</th>
                        <th className="px-6 py-4">Linked To</th>
                        <th className="px-6 py-4">Owner</th>
                        <th className="px-6 py-4 text-right rounded-tr-xl">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                    {tasks.map(task => (
                        <tr key={task.id} className="group hover:bg-neutral-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="font-medium text-neutral-900 line-clamp-1">{task.title}</span>
                                    <span className="text-xs text-neutral-500 line-clamp-1">{task.description}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-xs font-medium px-2 py-1 bg-neutral-100 text-neutral-600 rounded border border-neutral-200">
                                    {task.type || 'Task'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <StatusIcon status={task.status} />
                                    <span className="text-sm text-neutral-700">{task.status}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                                    <Calendar size={14} />
                                    <span>{task.dueDate}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {task.linkedEntity ? (
                                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                                        {task.linkedEntity.type === 'Account' ? <Building2 size={14} /> : <Briefcase size={14} />}
                                        <span className="truncate max-w-[120px]">{task.linkedEntity.name}</span>
                                    </div>
                                ) : (
                                    <span className="text-neutral-400 text-sm">-</span>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                                        {task.assignee.charAt(0)}
                                    </div>
                                    <span className="text-sm text-neutral-600">{task.assignee}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right relative">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === task.id ? null : task.id); }}
                                    className="text-neutral-400 hover:text-neutral-600 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                >
                                    <MoreVertical size={18} />
                                </button>

                                {openMenuId === task.id && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                                        <div className="absolute right-8 top-8 w-32 bg-white rounded-lg shadow-xl border border-neutral-100 z-20 overflow-hidden py-1 text-left">
                                            <button onClick={() => { onEdit(task); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50">Edit</button>
                                            <button onClick={() => { onDelete(task.id); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    {tasks.length === 0 && (
                        <tr><td colSpan={8} className="px-6 py-12 text-center text-neutral-400">No tasks found.</td></tr>
                    )}
                </tbody>
            </table>
        </motion.div>
    );
}
