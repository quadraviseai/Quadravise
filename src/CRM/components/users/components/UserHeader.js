import {
    Search,
    Plus,
    Filter,
    Users,
    ShieldCheck,
    UserX
} from "lucide-react";
import Button from "../../../../components/ui/Button";

export default function UserHeader({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    onAddUser,
    stats
}) {
    return (
        <div className="sticky top-0 z-30 bg-white border-b border-neutral-200 pb-4 pt-2 space-y-4 shadow-sm">

            {/* Top Row: Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
                        User Management
                        <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold border border-neutral-200">
                            {stats.total} Total
                        </span>
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Manage system access, roles, and security settings.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button onClick={onAddUser} className="flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
                        <Plus size={18} />
                        <span>Add User</span>
                    </Button>
                </div>
            </div>

            {/* Bottom Row: Controls & Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* Search & Filter */}
                <div className="flex items-center gap-3 flex-1">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or role..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-sm"
                        />
                    </div>

                    <div className="h-8 w-px bg-neutral-200 hidden md:block" />

                    <div className="flex items-center gap-1">
                        {['All', 'Active', 'Inactive'].map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${statusFilter === status
                                    ? 'bg-neutral-900 text-white border-neutral-900'
                                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="hidden lg:flex items-center gap-6 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>{stats.active} Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neutral-300" />
                        <span>{stats.inactive} Inactive</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-blue-500" />
                        <span>{stats.mfaEnabled} MFA Enabled</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
