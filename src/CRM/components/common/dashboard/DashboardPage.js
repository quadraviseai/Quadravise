import DashboardCard from "./DashboardCard";
import CRMTable from "../table/CRMTable";
import RightPanel from "./RightPanel";

export default function DashboardPage() {
  const stats = [
    { title: "New Leads", value: 45 },
    { title: "Open Deals", value: 23 },
    { title: "Pending Tasks", value: 12 },
    { title: "Revenue", value: "₹58,000" },
  ];

  return (
    <div className="space-y-6">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-xl font-semibold text-black">Dashboard</h1>
        <p className="text-sm text-neutral-500">
          Overview of your recent activity and key metrics
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <DashboardCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* TABLE */}
        <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-medium text-neutral-700">
            Recent Contacts
          </h2>
          <CRMTable />
        </div>

        {/* ACTIVITY */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-medium text-neutral-700">
            Recent Activity
          </h2>
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
