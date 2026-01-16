// import { motion } from "framer-motion";
// import { User, Tag } from "lucide-react";

// const data = [
//   { key: 1, name: "John Doe", email: "john@example.com", status: "Active" },
//   {
//     key: 2,
//     name: "Alice Smith",
//     email: "alice@example.com",
//     status: "Pending",
//   },
//   { key: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active" },
// ];

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     render: (text) => (
//       <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//         <User style={{ backgroundColor: "#0072ff" }}>{text.charAt(0)}</User>
//         <strong>{text}</strong>
//       </div>
//     ),
//   },
//   { title: "Email", dataIndex: "email" },
//   {
//     title: "Status",
//     dataIndex: "status",
//     render: (s) => (
//       <motion.span
//         whileHover={{ scale: 1.05 }}
//         style={{ padding: "6px 12px", borderRadius: 8 }}
//       >
//         <Tag color={s === "Active" ? "green" : "orange"}>{s}</Tag>
//       </motion.span>
//     ),
//   },
// ];

export default function CRMTable({ rows = [] }) {
  if (!rows.length) {
    return (
      <div className="px-4 py-8 text-sm text-neutral-500">No records found</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium">Email</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-neutral-200">
              <td className="px-4 py-3 font-medium">{row.name}</td>
              <td className="px-4 py-3">{row.email}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    row.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : row.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
