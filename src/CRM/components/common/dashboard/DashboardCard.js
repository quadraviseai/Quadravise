export default function DashboardCard({ title, value, subtitle }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-medium text-neutral-500">{title}</div>

      <div className="mt-2 text-2xl font-semibold text-black">{value}</div>

      {subtitle && (
        <div className="mt-1 text-xs text-neutral-400">{subtitle}</div>
      )}
    </div>
  );
}
