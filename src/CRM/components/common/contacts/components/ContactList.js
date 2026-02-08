import { useState } from "react";
import { UserOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "../../../../../components/ui/Button";

export default function ContactList({ contacts, selectedId, onSelect, onCreate }) {
    const [term, setTerm] = useState("");

    const filtered = contacts.filter(c =>
        c.name?.toLowerCase().includes(term.toLowerCase()) ||
        c.title?.toLowerCase().includes(term.toLowerCase()) ||
        c.account_name?.toLowerCase().includes(term.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full border-r border-neutral-200 w-full md:w-80 bg-white font-lato">
            {/* Search Header */}
            <div className="p-4 border-b border-neutral-100">
                <div className="flex justify-between items-center mb-5 px-1">
                    <h2 className="text-xl font-black tracking-tight text-neutral-900">Contacts</h2>
                    <Button
                        size="sm"
                        onClick={onCreate}
                        className="h-10 w-10 !px-0 flex items-center justify-center !rounded-full shadow-lg shadow-orange-500/20"
                        title="Create Contact"
                    >
                        <PlusOutlined className="text-lg" />
                    </Button>
                </div>
                <div className="relative">
                    <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-200 rounded-lg outline-none focus:border-brand-primary"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {filtered.map(contact => (
                    <div
                        key={contact.id}
                        onClick={() => onSelect(contact.id)}
                        className={`p-4 border-b border-neutral-50 cursor-pointer hover:bg-neutral-50 transition-colors ${selectedId === contact.id ? 'bg-brand-primary/5 border-l-4 border-l-brand-primary' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-semibold">
                                {contact.name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className={`text-sm font-medium truncate ${selectedId === contact.id ? 'text-brand-primary' : 'text-neutral-900'}`}>
                                        {contact.name}
                                    </h3>
                                    {contact.isPrimary && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Pri</span>}
                                </div>
                                <p className="text-xs text-neutral-500 truncate">{contact.title || 'No Title'} • {contact.account_name || 'No Account'}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="p-8 text-center text-neutral-400 text-sm">No contacts found</div>
                )}
            </div>
        </div>
    );
}
