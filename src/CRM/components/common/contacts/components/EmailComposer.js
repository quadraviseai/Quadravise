import { MailOutlined, SendOutlined } from "@ant-design/icons";
import Button from "../../../../../components/ui/Button";

/**
 * Premium Email Dispatch - Clean Light Edition
 */
const EmailComposer = ({ notes, subject, setSubject, body, setBody, onSend, isLightMode = true }) => {
    const emailHistory = notes.filter(n => n.type === 'email');

    return (
        <div className="pt-2 space-y-10 px-4 pb-8 bg-white font-lato">
            {/* Dispatch Interface */}
            <div className="bg-white border border-neutral-100 shadow-2xl shadow-neutral-200/50 rounded-[32px] overflow-hidden transition-all duration-500">
                <div className="bg-blue-50 px-8 py-5 border-b border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em]">Secure Dispatch Module</span>
                    </div>
                    <MailOutlined className="text-blue-600/30" />
                </div>
                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-6">
                        <span className="text-[9px] font-black text-neutral-400 w-20 text-right uppercase tracking-[0.2em]">Recipient</span>
                        <div className="flex-1 px-5 py-3 text-sm font-bold text-neutral-600 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[9px] text-white font-black">@</div>
                            Automated Contact Identity Mask
                        </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                        <span className="text-[9px] font-black text-neutral-400 w-20 text-right uppercase tracking-[0.2em]">Objective</span>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Descriptive Intent Line..."
                            className="flex-1 px-5 py-3.5 text-sm font-bold text-neutral-800 bg-white border border-neutral-200 rounded-2xl outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/5 transition-all placeholder:text-neutral-300"
                        />
                    </div>
                    <div className="pt-2">
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Articulate your strategic message here..."
                            className="w-full text-[15px] font-medium text-neutral-700 bg-white border border-neutral-200 rounded-[24px] p-6 outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/5 transition-all min-h-[240px] resize-none leading-relaxed placeholder:text-neutral-300"
                        />
                    </div>
                </div>
                <div className="px-8 py-6 bg-neutral-50/50 border-t border-neutral-100 flex justify-end">
                    <Button
                        onClick={() => onSend('email')}
                        disabled={!subject.trim() || !body.trim()}
                        className="px-12 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 group shadow-2xl shadow-blue-900/20 hover:scale-[1.02] transition-all disabled:opacity-30"
                    >
                        <span>Initiate Sync</span>
                        <SendOutlined className="text-[11px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                </div>
            </div>

            {/* Outbound Archive */}
            <div className="space-y-6">
                <h4 className="text-[10px] font-black text-neutral-400 font-sans uppercase tracking-[0.3em] px-2 flex items-center gap-4">
                    DISPATCHED INTELLIGENCE <div className="h-[1px] flex-1 bg-neutral-100"></div>
                </h4>
                {emailHistory.length > 0 ? (
                    emailHistory.map(note => (
                        <div key={note.id} className="bg-white border border-neutral-100 shadow-xl shadow-neutral-200/40 p-6 rounded-[28px] group transition-all hover:border-blue-200">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-blue-500/20">
                                        <MailOutlined />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black text-[14px] text-neutral-900 tracking-tight uppercase">Outbound Log</span>
                                        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Mail Interface</span>
                                    </div>
                                </div>
                                <span className="text-[9px] font-black text-neutral-500 bg-neutral-50 px-4 py-2 rounded-full border border-neutral-100">
                                    {new Date(note.created_at).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-[15px] text-neutral-600 leading-relaxed whitespace-pre-wrap pl-1 font-medium group-hover:text-neutral-800 transition-colors">
                                {note.content}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-24 bg-neutral-50 rounded-[32px] border border-dashed border-neutral-200 mx-2">
                        <MailOutlined className="text-4xl text-neutral-300 mb-4" />
                        <p className="text-[11px] font-black text-neutral-400 uppercase tracking-widest px-1">No communications archived.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailComposer;
