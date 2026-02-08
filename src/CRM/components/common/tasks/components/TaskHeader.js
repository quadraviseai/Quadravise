import {
    LayoutGrid,
    List as ListIcon,
    Plus,
    Calendar,
    Users,
    User,
    Settings
} from "lucide-react";
import Button from "../../../../../components/ui/Button";

export default function TaskHeader({
    viewMode,
    setViewMode,
    scope,
    setScope,
    timeFilter,
    setTimeFilter,
    onAddTask,
    isAdmin
}) {
    return (
        <div className="sticky top-0 z-50 bg-white border-b border-neutral-200 pb-4 pt-2 space-y-4 shadow-sm">

            {/* Top Row: Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
                        Tasks Board
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200">
                            Beta
                        </span>
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Manage projects, track SLAs, and collaborate with your team.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Scope Toggle - Only for Admins/Staff */}
                    {isAdmin && (
                        <div className="hidden md:flex bg-white rounded-lg p-1 border border-neutral-200 shadow-sm">
                            <button
                                onClick={() => setScope('me')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${scope === 'me' ? 'bg-neutral-900 text-white shadow' : 'text-neutral-500 hover:bg-neutral-50'}`}
                            >
                                <User size={14} /> My Tasks
                            </button>
                            <button
                                onClick={() => setScope('team')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${scope === 'team' ? 'bg-neutral-900 text-white shadow' : 'text-neutral-500 hover:bg-neutral-50'}`}
                            >
                                <Users size={14} /> Team
                            </button>
                        </div>
                    )}

                    <Button onClick={onAddTask} className="flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
                        <Plus size={18} />
                        <span>Quick Add</span>
                    </Button>
                </div>
            </div>

            {/* Bottom Row: Filters & View Switcher */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* Time Filters */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                    {['All', 'Today', 'This Week', 'Overdue'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setTimeFilter(filter)}
                            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${timeFilter === filter
                                ? filter === 'Overdue'
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : 'bg-neutral-800 text-white border-neutral-800'
                                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                    <div className="h-4 w-px bg-neutral-300 mx-2" />
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50">
                        <Calendar size={12} /> Custom Range
                    </button>
                </div>

                {/* View Switcher */}
                <div className="flex items-center gap-3">
                    {/* Settings / Preferences */}
                    <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
                        <Settings size={18} />
                    </button>

                    <div className="flex items-center rounded-lg bg-white p-1 border border-neutral-200 shadow-sm">
                        <button
                            onClick={() => setViewMode("board")}
                            className={`p-1.5 rounded-md transition-all flex items-center gap-2 px-3 ${viewMode === "board"
                                ? "bg-neutral-100 text-neutral-900 font-medium"
                                : "text-neutral-500 hover:text-neutral-700"
                                }`}
                        >
                            <LayoutGrid size={16} /> <span className="text-xs">Board</span>
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-1.5 rounded-md transition-all flex items-center gap-2 px-3 ${viewMode === "list"
                                ? "bg-neutral-100 text-neutral-900 font-medium"
                                : "text-neutral-500 hover:text-neutral-700"
                                }`}
                        >
                            <ListIcon size={16} /> <span className="text-xs">List</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
