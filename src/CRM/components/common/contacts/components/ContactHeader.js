import {
    MailOutlined,
    PhoneOutlined,
    LinkedinOutlined,
    BankOutlined,
    GlobalOutlined
} from "@ant-design/icons";
import { Tag } from "antd";

/**
 * High-Density Horizontal Contact Header
 */
export default function ContactHeader({ contact, onEdit }) {
    return (
        <div className="bg-white border-b border-neutral-100 px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sticky top-0 z-20 shadow-sm font-lato">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-black shadow-sm">
                    {contact.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-black text-neutral-900 tracking-tight">{contact.name}</h1>
                        {(contact.role === 'Primary Contact' || contact.isPrimary) && (
                            <Tag color="indigo" className="m-0 rounded-full font-black text-[9px] uppercase tracking-widest px-3 py-0.5 border-none bg-indigo-600 text-white">
                                PRIMARY IDENTITY
                            </Tag>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-neutral-500">
                        {/* Email / Alias */}
                        <div className="flex items-center gap-2">
                            <MailOutlined className="text-xs text-indigo-400" />
                            <span className="text-[13px] font-bold text-neutral-700">{contact.email || 'No Email'}</span>
                        </div>

                        {/* Phone / Dial */}
                        {contact.phone && (
                            <div className="flex items-center gap-2">
                                <div className="w-[1px] h-3 bg-neutral-200"></div>
                                <PhoneOutlined className="text-xs text-emerald-400" />
                                <span className="text-[13px] font-bold text-neutral-700">{contact.phone}</span>
                            </div>
                        )}

                        {/* LinkedIn / Footprint */}
                        {contact.linkedin && (
                            <div className="flex items-center gap-2">
                                <div className="w-[1px] h-3 bg-neutral-200"></div>
                                <LinkedinOutlined className="text-xs text-blue-400" />
                                <span className="text-[13px] font-bold text-neutral-700">Digital Footprint</span>
                            </div>
                        )}

                        {/* Org / Entity */}
                        <div className="flex items-center gap-2">
                            <div className="w-[1px] h-3 bg-neutral-200"></div>
                            <BankOutlined className="text-xs text-rose-400" />
                            <span className="text-[13px] font-black text-neutral-800 uppercase tracking-tight">{contact.account_name || 'Independent'}</span>
                        </div>

                        {/* Designation / Functional */}
                        <div className="flex items-center gap-2">
                            <div className="w-[1px] h-3 bg-neutral-200"></div>
                            <GlobalOutlined className="text-xs text-amber-400" />
                            <span className="text-[13px] font-bold text-neutral-600">{contact.title || contact.designation || 'Specialist'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onEdit}
                    className="px-8 py-2.5 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/10 active:scale-95"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
}
