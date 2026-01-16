import { useState } from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const [password, setPassword] = useState({
    current: "",
    next: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "English",
  });

  function saveProfile() {
    console.log("Save profile", profile);
  }

  function changePassword() {
    console.log("Change password", password);
    setPassword({ current: "", next: "" });
  }

  function deleteAccount() {
    console.log("Delete account");
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-black">Settings</h1>
        <p className="text-sm text-neutral-500">
          Manage your account preferences and security
        </p>
      </div>

      {/* Profile */}
      <Card>
        <h2 className="text-lg font-medium mb-4">Profile</h2>

        <div className="space-y-3">
          <Input
            label="Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <Input
            label="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <Button onClick={saveProfile}>Save profile</Button>
        </div>
      </Card>

      {/* Password */}
      <Card>
        <h2 className="text-lg font-medium mb-4">Password</h2>

        <div className="space-y-3">
          <Input
            type="password"
            label="Current password"
            value={password.current}
            onChange={(e) =>
              setPassword({ ...password, current: e.target.value })
            }
          />
          <Input
            type="password"
            label="New password"
            value={password.next}
            onChange={(e) => setPassword({ ...password, next: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <Button onClick={changePassword}>Change password</Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <h2 className="text-lg font-medium mb-4">Notifications</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  email: e.target.checked,
                })
              }
            />
            Email notifications
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  push: e.target.checked,
                })
              }
            />
            Push notifications
          </label>
        </div>
      </Card>

      {/* Preferences */}
      <Card>
        <h2 className="text-lg font-medium mb-4">Preferences</h2>

        <div className="space-y-3">
          <label className="block text-sm">
            Theme
            <select
              value={preferences.theme}
              onChange={(e) =>
                setPreferences({ ...preferences, theme: e.target.value })
              }
              className="mt-1 block w-40 rounded-md border border-neutral-300 px-2 py-1"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          <label className="block text-sm">
            Language
            <select
              value={preferences.language}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  language: e.target.value,
                })
              }
              className="mt-1 block w-40 rounded-md border border-neutral-300 px-2 py-1"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </label>
        </div>
      </Card>

      {/* Danger zone */}
      <Card className="border border-red-200">
        <h2 className="text-lg font-medium mb-4 text-red-600">Danger zone</h2>

        <Button variant="danger" onClick={deleteAccount}>
          Delete account
        </Button>
      </Card>
    </div>
  );
}
