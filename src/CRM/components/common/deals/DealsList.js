export default function DealsList({ deals, onEdit, onDelete }) {
  if (!deals || deals.length === 0) {
    return (
      <div className="px-4 py-8 text-sm text-neutral-500">No deals found</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Deal</th>
            <th className="px-4 py-3 text-left font-medium">Client</th>
            <th className="px-4 py-3 text-left font-medium">Value</th>
            <th className="px-4 py-3 text-left font-medium">Stage</th>
            <th className="px-4 py-3 text-left font-medium">Close Date</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id} className="border-t border-neutral-200">
              <td className="px-4 py-3 font-medium">{deal.title}</td>
              <td className="px-4 py-3">{deal.client || "—"}</td>
              <td className="px-4 py-3">${deal.value ?? "—"}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    deal.stage === "Closed Won"
                      ? "bg-green-100 text-green-700"
                      : deal.stage === "Closed Lost"
                      ? "bg-red-100 text-red-700"
                      : deal.stage === "Negotiation"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {deal.stage}
                </span>
              </td>
              <td className="px-4 py-3">{deal.closeDate || "—"}</td>
              <td className="px-4 py-3 space-x-3">
                <button
                  onClick={() => onEdit?.(deal)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete?.(deal.id)}
                  className="text-sm text-neutral-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
