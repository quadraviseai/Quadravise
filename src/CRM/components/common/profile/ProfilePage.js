import { useState } from "react";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";

export default function ProfilePage({ initialUser, onLogout }) {
  const [user, setUser] = useState(
    initialUser ?? {
      name: "Helen Jones",
      email: "helen.jones@example.com",
      phone: "+1 (555) 123-4567",
      title: "Account Manager",
      role: "Admin",
      memberSince: "2022-03-01",
    }
  );

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(user);

  function save() {
    setUser(draft);
    setEditing(false);
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-black">Profile</h1>
        <p className="text-sm text-neutral-500">
          Manage your account information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PROFILE CARD */}
        <Card className="space-y-4">
          <div>
            <div className="text-sm text-neutral-500">Full name</div>
            <div className="font-medium">{user.name}</div>
          </div>

          <div>
            <div className="text-sm text-neutral-500">Email</div>
            <div className="font-medium">{user.email}</div>
          </div>

          <div>
            <div className="text-sm text-neutral-500">Phone</div>
            <div className="font-medium">{user.phone || "—"}</div>
          </div>

          <div>
            <div className="text-sm text-neutral-500">Title</div>
            <div className="font-medium">{user.title || "—"}</div>
          </div>

          <div>
            <div className="text-sm text-neutral-500">Role</div>
            <div className="font-medium">{user.role}</div>
          </div>

          <div>
            <div className="text-sm text-neutral-500">Member since</div>
            <div className="font-medium">{user.memberSince}</div>
          </div>

          <div className="pt-4 flex gap-2">
            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
            <button
              onClick={onLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </Card>

        {/* RIGHT PANEL */}
        <Card className="lg:col-span-2">
          <h3 className="text-sm font-medium mb-2">Activity & Settings</h3>
          <p className="text-sm text-neutral-500">
            This section can later include:
          </p>

          <ul className="mt-3 list-disc list-inside text-sm text-neutral-600 space-y-1">
            <li>Recent logins</li>
            <li>Permissions & roles</li>
            <li>Password & security</li>
            <li>Audit logs</li>
          </ul>
        </Card>
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Edit profile</h2>

            <div className="space-y-3">
              <Input
                placeholder="Full name"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
              />
              <Input
                placeholder="Phone"
                value={draft.phone}
                onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
              />
              <Input
                placeholder="Title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setEditing(false)}
                className="text-sm text-neutral-600"
              >
                Cancel
              </button>
              <Button onClick={save}>Save changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
