import { useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", status: "Active" },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
    },
  ]);

  const [draft, setDraft] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  function addAccount() {
    if (!draft.name || !draft.email) return;
    setAccounts([
      { id: Date.now().toString(), ...draft, status: "Active" },
      ...accounts,
    ]);
    setDraft({ name: "", email: "" });
  }

  function updateAccount(id, updates) {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
    setEditingId(null);
  }

  function removeAccount(id) {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  }

  function toggleStatus(id) {
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Active" ? "Inactive" : "Active" }
          : a
      )
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-black">Accounts</h1>
        <p className="text-sm text-neutral-500">
          Manage customer and organization accounts
        </p>
      </div>

      {/* ADD ACCOUNT */}
      <div className="flex flex-wrap gap-2 rounded-xl border border-neutral-200 bg-white p-4">
        <Input
          placeholder="Account name"
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        />
        <Input
          placeholder="Email"
          value={draft.email}
          onChange={(e) => setDraft({ ...draft, email: e.target.value })}
        />
        <Button onClick={addAccount}>Add Account</Button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-neutral-500"
                >
                  No accounts found
                </td>
              </tr>
            ) : (
              accounts.map((acc) => (
                <tr key={acc.id} className="border-t border-neutral-200">
                  <td className="px-4 py-3">
                    {editingId === acc.id ? (
                      <Input
                        defaultValue={acc.name}
                        onBlur={(e) =>
                          updateAccount(acc.id, { name: e.target.value })
                        }
                      />
                    ) : (
                      acc.name
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {editingId === acc.id ? (
                      <Input
                        defaultValue={acc.email}
                        onBlur={(e) =>
                          updateAccount(acc.id, { email: e.target.value })
                        }
                      />
                    ) : (
                      acc.email
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(acc.id)}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        acc.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {acc.status}
                    </button>
                  </td>

                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => setEditingId(acc.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeAccount(acc.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
