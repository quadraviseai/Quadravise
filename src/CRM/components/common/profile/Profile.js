import { useState } from "react";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";

export default function ProfilePage({ onLogout }) {
  const [user, setUser] = useState({
    name: "Harsha",
    email: "harsha@example.com",
    role: "Admin",
  });

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(user);

  function save() {
    setUser(draft);
    setEditing(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-black">Profile</h1>
        <p className="text-sm text-neutral-500">
          Manage your account information
        </p>
      </div>

      {/* Profile info */}
      <Card className="space-y-4 max-w-lg">
        <div>
          <div className="text-sm text-neutral-500">Name</div>
          <div className="font-medium">{user.name}</div>
        </div>

        <div>
          <div className="text-sm text-neutral-500">Email</div>
          <div className="font-medium">{user.email}</div>
        </div>

        <div>
          <div className="text-sm text-neutral-500">Role</div>
          <div className="font-medium">{user.role}</div>
        </div>

        <div className="pt-4 flex gap-3">
          <Button onClick={() => setEditing(true)}>Edit profile</Button>

          <button
            onClick={onLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Log out
          </button>
        </div>
      </Card>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Edit profile</h2>

            <div className="space-y-3">
              <Input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="Name"
              />
              <Input
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                placeholder="Email"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setEditing(false)}
                className="text-sm text-neutral-600"
              >
                Cancel
              </button>
              <Button onClick={save}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
