import { MessageOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Button from "../../../../../components/ui/Button";

/**
 * Premium Notes Section - Clean Light Edition
 */
const NotesSection = ({ notes, newNote, setNewNote, onAddNote, isLightMode = true }) => {
    const filteredNotes = notes.filter(n => n.type === 'note' || !n.type);

    return (
        <div className="pt-2 space-y-10 px-4 pb-8 bg-white font-lato">
            {/* Note Input Card */}
            <div className="bg-white border border-neutral-100 shadow-xl shadow-neutral-100 rounded-[32px] p-8 focus-within:shadow-indigo-500/10 focus-within:border-indigo-500/40 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-indigo-500">
                        <MessageOutlined className="text-sm" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em]">Capture Insight</span>
                    </div>
                </div>
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="What's the latest update on this contact?"
                    className="w-full text-base font-medium text-neutral-800 bg-transparent border-none outline-none min-h-[140px] resize-none placeholder:text-neutral-300"
                />
                <div className="flex justify-end pt-6 border-t border-neutral-50">
                    <Button
                        onClick={() => onAddNote('note')}
                        disabled={!newNote.trim()}
                        className="px-10 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-900/20 hover:scale-[1.02] transition-all disabled:opacity-30"
                    >
                        Persist Note
                    </Button>
                </div>
            </div>

            {/* Notes List */}
            <div className="space-y-6">
                <h4 className="text-[10px] font-black text-neutral-400 font-sans uppercase tracking-[0.3em] px-2 flex items-center gap-4">
                    ARCHIVED REMARKS <div className="h-[1px] flex-1 bg-neutral-100"></div>
                </h4>
                {filteredNotes.length > 0 ? (
                    filteredNotes.map(note => (
                        <div key={note.id} className="bg-white border border-neutral-100 shadow-lg shadow-neutral-200/30 hover:shadow-neutral-200 hover:border-indigo-100 p-6 rounded-[24px] transition-all group">
                            <div className="flex justify-between items-center mb-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center font-black text-neutral-500 text-xs border border-neutral-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        {note.created_by_name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black text-[14px] text-neutral-900 tracking-tight">{note.created_by_name}</span>
                                        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Team Contributor</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[9px] font-black text-neutral-500 bg-neutral-50 px-4 py-2 rounded-full border border-neutral-100">
                                    <ClockCircleOutlined className="text-indigo-500" /> {new Date(note.created_at).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                            <p className="text-[15px] text-neutral-600 leading-relaxed whitespace-pre-wrap pl-1 font-medium italic">
                                "{note.content}"
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-24 bg-neutral-50 rounded-[32px] border border-dashed border-neutral-200 mx-2">
                        <MessageOutlined className="text-4xl mb-4 text-neutral-300" />
                        <p className="text-[11px] font-black text-neutral-400 uppercase tracking-widest px-1">Clear slate. Record your first insight.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesSection;
