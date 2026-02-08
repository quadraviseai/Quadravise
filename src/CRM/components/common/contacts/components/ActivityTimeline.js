import { Timeline, Spin } from "antd";
import {
    MailOutlined,
    PhoneOutlined,
    MessageOutlined,
    FileTextOutlined,
    PlayCircleOutlined,
    CalendarOutlined,
    ClockCircleOutlined
} from "@ant-design/icons";

/**
 * Premium Activity Timeline - Clean Light Edition
 * Strictly solid white cards, no dark theme remnants.
 */
const ActivityTimeline = ({ activities, loading, isLightMode = true }) => {
    const getActivityIcon = (type) => {
        const iconClasses = "p-1.5 rounded-lg border text-sm";
        switch (type) {
            case 'email': return <div className={`${iconClasses} bg-blue-50 text-blue-600 border-blue-100`}><MailOutlined /></div>;
            case 'call': return <div className={`${iconClasses} bg-emerald-50 text-emerald-600 border-emerald-100`}><PhoneOutlined /></div>;
            case 'note': return <div className={`${iconClasses} bg-amber-50 text-amber-600 border-amber-100`}><MessageOutlined /></div>;
            case 'mom': return <div className={`${iconClasses} bg-purple-50 text-purple-600 border-purple-100`}><FileTextOutlined /></div>;
            case 'meeting': return <div className={`${iconClasses} bg-indigo-50 text-indigo-600 border-indigo-100`}><CalendarOutlined /></div>;
            case 'stage_change': return <div className={`${iconClasses} bg-rose-50 text-rose-600 border-rose-100`}><PlayCircleOutlined /></div>;
            default: return <div className={`${iconClasses} bg-neutral-50 text-neutral-600 border-neutral-100`}><PlayCircleOutlined /></div>;
        }
    };

    if (loading) {
        return <div className="flex justify-center py-20"><Spin size="large" /></div>;
    }

    if (!activities || activities.length === 0) {
        return (
            <div className="text-center py-24 bg-neutral-50 rounded-3xl border border-dashed border-neutral-200 mx-4">
                <CalendarOutlined className="text-4xl text-neutral-300 mb-4" />
                <p className="text-[11px] font-black text-neutral-400 uppercase tracking-widest px-1">Session records empty. Start the history.</p>
            </div>
        );
    }

    return (
        <div className="pt-2 px-1 bg-white font-lato">
            <Timeline mode="left" className="premium-timeline-colorful pb-6">
                {activities.map((activity, idx) => (
                    <Timeline.Item
                        key={`${activity.type}-${activity.id}-${idx}`}
                        dot={getActivityIcon(activity.type)}
                        className="pb-12"
                    >
                        <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-xl shadow-neutral-200/40 hover:shadow-indigo-500/10 transition-all duration-300 -mt-1 ml-6 group">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-black text-neutral-800 text-[14px] tracking-tight group-hover:text-indigo-600 transition-colors uppercase">
                                    {activity.metadata?.title || activity.title}
                                </h4>
                                <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 uppercase tracking-wider">
                                    {new Date(activity.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                            <p className="text-neutral-600 text-[14px] leading-relaxed mb-6 font-medium">
                                {activity.description}
                            </p>
                            <div className="flex items-center gap-4 border-t border-neutral-50 pt-5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 flex items-center justify-center text-[10px] text-white font-black shadow-lg">
                                    {activity.user?.charAt(0) || 'U'}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-neutral-700 uppercase tracking-widest">
                                        {activity.user}
                                    </span>
                                    <span className="text-[10px] text-neutral-400 font-bold flex items-center gap-2">
                                        <ClockCircleOutlined className="text-indigo-500 text-[10px]" />
                                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    );
};

export default ActivityTimeline;
