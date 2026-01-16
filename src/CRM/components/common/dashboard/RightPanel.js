const activities = [
  { text: "Called John Doe", time: "2 minutes ago" },
  { text: "Meeting with Alice", time: "15 minutes ago" },
  { text: "Completed task: Send proposal", time: "1 hour ago" },
  { text: "Closed deal with Acme Corp", time: "3 hours ago" },
];

export default function RightPanel() {
  return (
    <div className="space-y-3">
      {activities.map((item, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2"
        >
          {/* Timeline dot */}
          <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-neutral-400" />

          <div className="flex-1">
            <p className="text-sm text-neutral-800">{item.text}</p>
            <p className="mt-0.5 text-xs text-neutral-400">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
