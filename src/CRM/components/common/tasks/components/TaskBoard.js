import { motion } from "framer-motion";
import TaskCard from "./TaskCard";

export default function TaskBoard({ columns, tasks, onUpdateStatus, onEdit, onDelete }) {

    // Helper to move tasks logically based on columns array index
    const moveTask = (taskId, currentStatus, direction) => {
        const currentIndex = columns.findIndex(c => c.id === currentStatus);
        if (currentIndex === -1) return;

        let newIndex = direction === 'Next' ? currentIndex + 1 : currentIndex - 1;
        if (newIndex >= 0 && newIndex < columns.length) {
            onUpdateStatus(taskId, columns[newIndex].id);
        }
    };

    const onDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const onDrop = (e, newStatus) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        if (!data) return;

        try {
            const { taskId, fromStatus } = JSON.parse(data);
            if (fromStatus !== newStatus) {
                onUpdateStatus(taskId, newStatus);
            }
        } catch (error) {
            console.error("[TaskBoard] Drop error:", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full overflow-x-auto pb-4"
        >
            {columns.map(col => {
                const colTasks = tasks.filter(t => t.status === col.id);

                return (
                    <div
                        key={col.id}
                        className="flex flex-col h-full min-w-[300px]"
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, col.id)}
                    >
                        {/* Column Header */}
                        <div className={`px-4 py-3 rounded-t-xl border-b-2 flex items-center justify-between bg-white ${col.color.replace('text-', 'border-').replace('bg-', 'border-').split(' ')[2] || 'border-neutral-200'}`}>
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                                <h3 className="font-bold text-neutral-800 text-sm tracking-wide">{col.label}</h3>
                                <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 text-xs font-bold shadow-inner">
                                    {colTasks.length}
                                </span>
                            </div>
                        </div>

                        {/* Column Body */}
                        <div className="flex-1 bg-neutral-50/50 rounded-b-xl border border-t-0 border-neutral-200 p-3 space-y-3 min-h-[500px]">
                            {colTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onUpdateStatus={(id, dir) => moveTask(id, task.status, dir)}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                            {colTasks.length === 0 && (
                                <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-lg text-neutral-400 gap-2">
                                    <span className="text-sm font-medium">No tasks</span>
                                    <span className="text-xs">Drag items here</span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </motion.div>
    );
}
