import { motion } from "framer-motion";
import {
    X,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ShieldCheck,
    Globe,
    Camera,
    LogOut,
    Edit2
} from "lucide-react";
import Button from "../../../../components/ui/Button";

export default function UserProfilePanel({ user, onClose, onUpdate }) {
    if (!user) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex justify-end">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm"
            />

            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full"
            >
                {/* Header - Clean & Compact */}
                <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-neutral-200 bg-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-neutral-900">User Profile</h2>
                            <p className="text-sm text-neutral-500 mt-0.5">View and manage user details</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 p-2 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Profile Info - Compact */}
                    <div className="px-6 py-6 border-b border-neutral-100">
                        <div className="flex items-start gap-4">
                            <div className="relative flex-shrink-0">
                                <img
                                    src={(() => {
                                        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
                                        const displayName = fullName || user.email || 'User';
                                        return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3b82f6&color=fff&size=96`;
                                    })()}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full shadow-md"
                                />
                                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white shadow hover:bg-blue-700 transition-colors">
                                    <Camera size={12} />
                                </button>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-neutral-900 truncate">
                                    {(() => {
                                        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
                                        return fullName || <span className="text-neutral-500 italic">{user.email}</span>;
                                    })()}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-md text-xs font-bold border border-purple-200">
                                        {user.role}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${user.is_active ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                                        {user.is_active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="px-6 py-6 space-y-6">
                        {/* Contact Information */}
                        <section>
                            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <Mail size={16} className="text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs text-neutral-500">Email</div>
                                        <div className="font-medium text-neutral-900 truncate">{user.email}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                                        <Phone size={16} className="text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-neutral-500">Phone</div>
                                        <div className="font-medium text-neutral-900">+1 (555) 000-0000</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                                        <MapPin size={16} className="text-orange-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-neutral-500">Location</div>
                                        <div className="font-medium text-neutral-900">San Francisco, CA</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* System & Security */}
                        <section>
                            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">System & Security</h3>
                            <div className="bg-neutral-50 rounded-lg border border-neutral-200 divide-y divide-neutral-200">
                                <div className="flex justify-between items-center p-3 text-sm">
                                    <div className="flex items-center gap-2 text-neutral-600">
                                        <Globe size={14} />
                                        <span>Timezone</span>
                                    </div>
                                    <span className="font-medium text-neutral-900">Pacific Time (PT)</span>
                                </div>
                                <div className="flex justify-between items-center p-3 text-sm">
                                    <div className="flex items-center gap-2 text-neutral-600">
                                        <Calendar size={14} />
                                        <span>Joined</span>
                                    </div>
                                    <span className="font-medium text-neutral-900">Jan 12, 2024</span>
                                </div>
                                <div className="flex justify-between items-center p-3 text-sm">
                                    <div className="flex items-center gap-2 text-neutral-600">
                                        <ShieldCheck size={14} />
                                        <span>MFA Status</span>
                                    </div>
                                    <span className={`font-bold ${user.mfaEnabled ? 'text-green-600' : 'text-orange-600'}`}>
                                        {user.mfaEnabled ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Recent Activity */}
                        <section>
                            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Recent Activity</h3>
                            <div className="space-y-3">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-sm text-neutral-700">
                                                Updated Deal <span className="font-semibold text-neutral-900">Q3 Enterprise License</span>
                                            </p>
                                            <span className="text-xs text-neutral-400 block mt-0.5">2 hours ago</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Danger Zone */}
                        <section className="pt-4 border-t border-neutral-200">
                            <button className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium w-full p-3 hover:bg-red-50 rounded-lg transition-colors border border-red-200">
                                <LogOut size={16} />
                                Force Sign Out & Reset Password
                            </button>
                        </section>
                    </div>
                </div>

                {/* Footer - Sticky Bottom */}
                <div className="flex-shrink-0 p-4 border-t border-neutral-200 bg-white">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => onUpdate(user)}>
                        <Edit2 size={16} className="mr-2" />
                        Save Changes
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
