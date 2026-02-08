import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { message, Spin } from "antd";

import TaskHeader from "./components/TaskHeader";
import TaskBoard from "./components/TaskBoard";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { tasksAPI } from "../../../../services/tasksAPI";
import { useAuth } from "../../../../context/AuthContext";

export default function TasksPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin' || user?.is_staff;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("board"); // 'board' | 'list'

  // Filter States
  const [scope, setScope] = useState(isAdmin ? 'team' : 'me'); // 'me' | 'team'
  const [timeFilter, setTimeFilter] = useState('All'); // 'All' | 'Today' | 'This Week' | 'Overdue'

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    dueDate: "",
    tag: "General",
    type: "Task",
    linkedEntity: null,
    assignee: "Me",
    assigned_to: null,
    tagged_users: []
  });

  // Fetch Tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      // Basic filtering params
      const params = {};
      if (scope === 'me') params.assigned_to = 'me';

      // Time filter logic could be added here or kept client-side for now
      const response = await tasksAPI.getTasks(params);

      // Handle paginated response - API returns {count, results} or just an array
      const data = response.results || response;
      const formattedTasks = data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status, // Should match 'To Do', 'In Progress', 'Done'
        priority: task.priority,
        dueDate: task.due_date,
        assignee: task.assigned_to_name || "Unassigned",
        tag: "General", // Placeholder as backend doesn't have tag
        type: "Task",
        linkedEntity: task.account_name
          ? { type: 'Account', name: task.account_name }
          : task.deal_name
            ? { type: 'Deal', name: task.deal_name }
            : null,
        // Keep original fields for editing
        original: task
      }));
      setTasks(formattedTasks);
    } catch (error) {
      message.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [scope]); // Refetch when scope changes

  // Filter Logic (Client-side for Time Filter)
  const filteredTasks = tasks.filter(t => {
    // 1. Time Filter
    if (timeFilter === 'Overdue') {
      return t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Done';
    }
    if (timeFilter === 'Today') {
      if (!t.dueDate) return false;
      const today = new Date().toDateString();
      return new Date(t.dueDate).toDateString() === today;
    }
    // Add more time filters as needed
    return true;
  });

  // --- Handlers ---

  const resetForm = () => {
    setNewTask({
      title: "", description: "", status: "To Do", priority: "Medium", dueDate: "", tag: "General", type: "Task", linkedEntity: null, assignee: "Me", assigned_to: null, tagged_users: []
    });
    setEditingId(null);
    setShowModal(false);
  };

  const handleSaveTask = async () => {
    if (!newTask.title.trim()) {
      message.warning("Task title is required");
      return;
    }

    try {
      const payload = {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        priority: newTask.priority,
        due_date: newTask.dueDate || null,
        assigned_to: newTask.assignee === "Me" ? null : newTask.assignee,
        tagged_users: newTask.tagged_users || [],
        // Preserve linked records if present and not changed (simplified logic)
        account: newTask.account_id || null,
        deal: newTask.deal_id || null,
      };

      if (editingId) {
        await tasksAPI.updateTask(editingId, payload);
        message.success("Task updated");
      } else {
        await tasksAPI.createTask(payload);
        message.success("Task created");
      }
      await fetchTasks();
      resetForm();
    } catch (error) {
      message.error("Failed to save task");
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setNewTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "",
      tag: "General", // Placeholder
      type: "Task", // Placeholder
      linkedEntity: task.linkedEntity,
      assignee: task.original?.assigned_to || "Me",
      assigned_to: task.original?.assigned_to,
      tagged_users: task.original?.tagged_users || [],
      // Preserve IDs for updates
      account_id: task.original?.account,
      deal_id: task.original?.deal
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await tasksAPI.deleteTask(id);
        setTasks(tasks.filter(t => t.id !== id));
        message.success("Task deleted");
      } catch (error) {
        message.error("Failed to delete task");
      }
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    // Optimistic Update
    const oldTasks = [...tasks];
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

    try {
      await tasksAPI.updateTask(taskId, { status: newStatus });
    } catch (error) {
      setTasks(oldTasks);
      message.error("Failed to update status");
    }
  };

  if (loading && tasks.length === 0) {
    return <div className="flex justify-center items-center h-full"><Spin size="large" /></div>;
  }

  return (
    <div className="min-h-full space-y-6">

      {/* 1. Header & Filters */}
      <TaskHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        scope={scope}
        setScope={setScope}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        onAddTask={() => { resetForm(); setShowModal(true); }}
        isAdmin={isAdmin}
      />

      {/* 2. Content */}
      <AnimatePresence mode="wait">
        {viewMode === "board" ? (
          <TaskBoard
            columns={[
              { id: "To Do", label: "TO DO", color: "text-orange-600", dotColor: "bg-orange-500" },
              { id: "In Progress", label: "IN PROGRESS", color: "text-blue-600", dotColor: "bg-blue-500" },
              { id: "Done", label: "DONE", color: "text-green-600", dotColor: "bg-green-500" }
            ]}
            tasks={filteredTasks}
            onUpdateStatus={updateStatus}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>

      {/* 3. Modal */}
      {showModal && (
        <TaskForm
          title={editingId ? "Edit Task" : "Create New Task"}
          newTask={newTask}
          setNewTask={setNewTask}
          onClose={resetForm}
          onSave={handleSaveTask}
          isEdit={!!editingId}
        />
      )}
    </div>
  );
}
