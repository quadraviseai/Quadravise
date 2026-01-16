import { useState } from "react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "Virat Kohli",
      role: "CEO",
      company: "Sports Inc.",
      status: "Active",
    },
    {
      id: "2",
      name: "Elena D’Costa",
      role: "CTO",
      company: "Techify",
      status: "Away",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [draft, setDraft] = useState({
    name: "",
    role: "",
    company: "",
    status: "Active",
  });

  function addContact() {
    if (!draft.name.trim()) return;

    setContacts([{ id: Date.now().toString(), ...draft }, ...contacts]);

    setDraft({ name: "", role: "", company: "", status: "Active" });
    setShowModal(false);
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black">Contacts</h1>
          <p className="text-sm text-neutral-500">
            People associated with your accounts and deals
          </p>
        </div>

        <Button onClick={() => setShowModal(true)}>Add Contact</Button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Role</th>
              <th className="px-4 py-3 text-left font-medium">Company</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-neutral-500"
                >
                  No contacts found
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr key={c.id} className="border-t border-neutral-200">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.role}</td>
                  <td className="px-4 py-3">{c.company}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        c.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : c.status === "Away"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-3">
                    <button className="text-sm text-blue-600 hover:underline">
                      Message
                    </button>
                    <button className="text-sm text-neutral-600 hover:underline">
                      Call
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD CONTACT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Add Contact</h2>

            <div className="space-y-3">
              <Input
                placeholder="Name"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
              <Input
                placeholder="Role"
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
              />
              <Input
                placeholder="Company"
                value={draft.company}
                onChange={(e) =>
                  setDraft({ ...draft, company: e.target.value })
                }
              />
              <select
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                className="h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm"
              >
                <option value="Active">Active</option>
                <option value="Away">Away</option>
                <option value="Busy">Busy</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-neutral-600"
              >
                Cancel
              </button>
              <Button onClick={addContact}>Save Contact</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
