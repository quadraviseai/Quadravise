import {
    FileTextOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    PlusOutlined,
    RobotOutlined,
    BulbOutlined
} from "@ant-design/icons";
import { Tag } from "antd";
import Button from "../../../../../components/ui/Button";

/**
 * Premium Session Vault (MoM) - Clean Light Edition
 */
const MoMSection = ({
    notes,
    title,
    setTitle,
    content,
    setContent,
    aiSuggestions,
    isAnalyzing,
    onAnalyze,
    onSave,
    onCreateTask,
    onReset,
    isLightMode = true
}) => {
    const momHistory = notes.filter(n => n.type === 'mom');

    return (
        <div className="pt-2 space-y-12 px-4 pb-12 bg-white font-lato">
            {/* Session Records horizontal scroll */}
            <div className="space-y-6">
                <div className="flex justify-between items-center px-2">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] flex items-center gap-2">
                        <FileTextOutlined className="text-xs" /> SESSION ARCHIVE
                    </label>
                    <Tag color="rose" className="rounded-full font-black border-none bg-rose-50 text-rose-600 px-5 py-1.5 text-[9px] uppercase tracking-widest border border-rose-100 shadow-sm">
                        {momHistory.length} NODE SESSIONS
                    </Tag>
                </div>

                <div className="flex overflow-x-auto gap-6 pb-8 custom-scrollbar-colorful snap-x px-2">
                    {momHistory.length > 0 ? (
                        momHistory.map(note => (
                            <div
                                key={note.id}
                                className={`flex-shrink-0 w-80 p-6 rounded-[32px] border transition-all duration-500 cursor-pointer snap-start relative overflow-hidden group ${title === note.title && content === note.content
                                    ? 'bg-gradient-to-br from-rose-500 to-indigo-600 border-none text-white shadow-2xl shadow-rose-900/30 scale-[1.02] z-10'
                                    : 'bg-white border-neutral-100 shadow-xl shadow-neutral-200/40 hover:border-rose-300 hover:shadow-rose-500/5'
                                    }`}
                                onClick={() => {
                                    setTitle(note.title || 'Untitled Meeting');
                                    setContent(note.content);
                                }}
                            >
                                {title === note.title && content === note.content && (
                                    <div className="absolute top-0 right-0 p-6 opacity-20 scale-[2.5] pointer-events-none">
                                        <CheckCircleOutlined />
                                    </div>
                                )}
                                <div className="flex justify-between items-start mb-5">
                                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${title === note.title && content === note.content ? 'bg-white/20 shadow-inner' : 'bg-rose-50 text-rose-500 border border-rose-100'
                                        }`}>
                                        <CalendarOutlined className="text-lg" />
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${title === note.title && content === note.content ? 'text-white/80 border-white/20' : 'text-neutral-400 border-neutral-100'
                                        }`}>
                                        {new Date(note.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <h5 className={`font-black text-[15px] mb-3 truncate tracking-tight ${title === note.title && content === note.content ? 'text-white' : 'text-neutral-900'
                                    }`}>
                                    {note.title || 'Untitled Meeting'}
                                </h5>
                                <p className={`text-[13px] line-clamp-2 leading-relaxed font-medium ${title === note.title && content === note.content ? 'text-white/90' : 'text-neutral-500'
                                    }`}>
                                    {note.content}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center py-24 bg-neutral-50 rounded-[40px] border border-dashed border-neutral-200 mx-2">
                            <CalendarOutlined className="text-5xl text-neutral-200 mb-6" />
                            <p className="text-[11px] font-black text-neutral-400 uppercase tracking-widest px-1">Awaiting digital transcription footprint.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Editor Workspace */}
            <div className="bg-white border border-neutral-100 shadow-2xl shadow-neutral-200/50 rounded-[40px] overflow-hidden transition-all duration-700">
                <div className="bg-neutral-50 px-8 py-6 border-b border-neutral-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse"></div>
                        <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.3em]">Session Synchronization Hub</span>
                    </div>
                    {content && (
                        <Button size="small" type="text" onClick={onReset} className="text-[10px] font-black text-rose-500 hover:text-rose-600 tracking-widest flex items-center gap-2">
                            <PlusOutlined className="text-[9px]" /> TERMINATE LOG
                        </Button>
                    )}
                </div>

                <div className="p-10 space-y-8">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Anchor Title (e.g. Executive Alignment)"
                        className="w-full text-3xl font-black text-neutral-900 border-none outline-none bg-transparent tracking-tighter placeholder:text-neutral-200"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Distill the tectonic shifts discussed in this session..."
                        className="w-full text-[17px] font-medium text-neutral-600 border-none outline-none min-h-[260px] resize-none leading-relaxed bg-transparent placeholder:text-neutral-200 focus:text-neutral-900 transition-colors"
                    />
                </div>

                {/* AI Insight Module */}
                {aiSuggestions && (
                    <div className="mx-10 mb-10 bg-indigo-50 border border-indigo-100 rounded-[32px] p-8 relative overflow-hidden group shadow-xl shadow-indigo-500/5">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.04] scale-[3] pointer-events-none">
                            <RobotOutlined className="text-indigo-600 text-9xl" />
                        </div>
                        <div className="flex items-center gap-4 text-indigo-600 mb-8 px-2">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <BulbOutlined className="text-xl animate-pulse" />
                            </div>
                            <span className="font-black text-[11px] uppercase tracking-[0.4em] bg-white border border-indigo-100 px-6 py-2 rounded-full">AI Synthesis Suite</span>
                        </div>

                        <p className="text-[17px] text-neutral-900 leading-relaxed font-black mb-10 pl-2 italic tracking-tight border-l-4 border-indigo-600 px-6">
                            "{aiSuggestions.summary}"
                        </p>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] px-4 flex items-center gap-5">
                                STRATEGIC NEXT ACTIONS <div className="h-[1px] flex-1 bg-indigo-200"></div>
                            </label>
                            {aiSuggestions.tasks.map((task, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-white border border-neutral-100 shadow-md p-5 rounded-2xl hover:border-indigo-400 group/task transition-all">
                                    <span className="text-[15px] font-black text-neutral-800 pr-8 tracking-tight group-hover/task:text-indigo-600 transition-colors">{typeof task === 'string' ? task : (task?.title || "Suggestion")}</span>
                                    <Button
                                        size="small"
                                        onClick={() => onCreateTask(task)}
                                        className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 border-none text-white text-[10px] font-black rounded-xl h-11 px-8 flex items-center gap-2 shadow-lg shadow-indigo-900/20 hover:scale-[1.02] transition-all"
                                    >
                                        <PlusOutlined className="text-[9px]" /> CONVERT TO TASK
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="px-10 py-8 bg-neutral-50/50 border-t border-neutral-100 flex justify-end gap-6">
                    <Button
                        onClick={onAnalyze}
                        loading={isAnalyzing}
                        disabled={!content.trim()}
                        className="px-10 py-3.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-600 font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center gap-3 transition-all disabled:opacity-20"
                    >
                        <RobotOutlined className="text-sm" /> SYNTHESIZE INTEL
                    </Button>
                    <Button
                        onClick={() => onSave('mom')}
                        disabled={!content.trim() || !title.trim()}
                        className="px-12 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-2xl shadow-rose-900/20 hover:scale-[1.02] transition-all disabled:opacity-30"
                    >
                        {notes.some(n => n.title === title && n.content === content) ? 'SYNCHRONIZE UPDATE' : 'RECORD FINAL SESSION'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MoMSection;
