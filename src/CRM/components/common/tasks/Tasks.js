import { useState } from "react";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Call client for feedback",
      status: "Pending",
      priority: "High",
      dueDate: "2025-03-25",
    },
    {
      id: "2",
      title: "Send proposal email",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2025-03-26",
    },
    {
      id: "3",
      title: "Prepare sales report",
      status: "Completed",
      priority: "Low",
      dueDate: "2025-03-20",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [draft, setDraft] = useState({
    title: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });

  function addTask() {
    if (!draft.title.trim()) return;

    setTasks([{ id: Date.now().toString(), ...draft }, ...tasks]);

    setDraft({
      title: "",
      status: "Pending",
      priority: "Medium",
      dueDate: "",
    });
    setShowModal(false);
  }

  function removeTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black">Tasks</h1>
          <p className="text-sm text-neutral-500">
            Track and manage your daily work
          </p>
        </div>

        <Button onClick={() => setShowModal(true)}>Add Task</Button>
      </div>

      {/* Tasks table */}
      <Card className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Task</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Priority</th>
              <th className="px-4 py-3 text-left font-medium">Due</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-neutral-500"
                >
                  No tasks yet
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="border-t border-neutral-200">
                  <td className="px-4 py-3 font-medium">{task.title}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="px-4 py-3">{task.dueDate || "—"}</td>

                  <td className="px-4 py-3 space-x-3">
                    <button className="text-sm text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-sm text-neutral-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {/* Add task modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Add task</h2>

            <div className="space-y-3">
              <Input
                placeholder="Task title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />

              <select
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                className="h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <select
                value={draft.priority}
                onChange={(e) =>
                  setDraft({ ...draft, priority: e.target.value })
                }
                className="h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <Input
                type="date"
                value={draft.dueDate}
                onChange={(e) =>
                  setDraft({ ...draft, dueDate: e.target.value })
                }
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-neutral-600"
              >
                Cancel
              </button>
              <Button onClick={addTask}>Save task</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
