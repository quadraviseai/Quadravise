import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  MoreOutlined,
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  ClearOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { Dropdown, message, Spin } from "antd";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import CreateDealModal from "./CreateDealModal";
import TaskForm from "../tasks/components/TaskForm";
import dealsAPI from "../../../../services/dealsAPI";
import tasksAPI from "../../../../services/tasksAPI";

// Define Pipeline Stages
const STAGES = {
  'New': { id: 'New', title: 'New', color: 'bg-blue-500' },
  'Qualification': { id: 'Qualification', title: 'Qualification', color: 'bg-purple-500' },
  'Proposition': { id: 'Proposition', title: 'Proposition', color: 'bg-amber-500' },
  'Negotiation': { id: 'Negotiation', title: 'Negotiation', color: 'bg-orange-500' },
  'Won': { id: 'Won', title: 'Won', color: 'bg-green-500' },
  'Lost': { id: 'Lost', title: 'Lost', color: 'bg-red-500' },
};

export default function DealsPage() {
  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Task Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskContext, setTaskContext] = useState(null); // { deal: {}, account: {} }
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    type: "General",
    priority: "Medium",
    status: "To Do",
    dueDate: "",
    assignee: "Me"
  });

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const data = await dealsAPI.getDeals();
      const deals = data.results || data;

      // Organize into columns
      const newColumns = {};
      Object.values(STAGES).forEach(stage => {
        newColumns[stage.id] = {
          ...stage,
          cards: deals.filter(d => d.stage === stage.id),
          total: deals.filter(d => d.stage === stage.id).reduce((sum, d) => sum + parseFloat(d.amount), 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        };
      });
      setColumns(newColumns);
    } catch (error) {
      console.error("Error fetching deals:", error);
      message.error("Failed to load deals");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDeal = async (dealData) => {
    try {
      await dealsAPI.createDeal({
        ...dealData,
        name: dealData.title,
        amount: parseFloat(dealData.amount || 0)
      });
      message.success("Deal created successfully");
      fetchDeals();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating deal:", error);
      message.error("Failed to create deal");
    }
  };

  const handleCreateTask = async () => {
    // 1. Close Modal Immediately
    setIsTaskModalOpen(false);

    // 2. Show Loading Feedback
    const key = 'creatingTask';
    message.loading({ content: 'Creating task...', key });

    try {
      // 3. API Call
      await tasksAPI.createTask({
        ...newTask,
        deal: taskContext?.deal?.id,
        account: taskContext?.account?.id, // If deal has account info
        due_date: newTask.dueDate || null
      });

      // 4. Success Feedback & Refresh
      message.success({ content: 'Task created linked to deal', key, duration: 2 });
      setNewTask({ title: "", description: "", type: "General", priority: "Medium", status: "To Do", dueDate: "", assignee: "Me" });

      // 5. Refresh to update counts
      fetchDeals();

    } catch (error) {
      console.error("Error creating task:", error);
      message.error({ content: 'Failed to create task', key, duration: 3 });
    }
  };

  const openTaskModal = (deal) => {
    setTaskContext({
      deal: deal,
      account: deal.account ? { id: deal.account, name: deal.account_name } : null
    });
    // Pre-fill task title optionally
    setNewTask(prev => ({ ...prev, title: `Follow up on ${deal.name}` }));
    setIsTaskModalOpen(true);
  };


  const onDragStart = (e, card, fromCol) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ card, fromCol }));
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = async (e, toColId) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (!data) {
      console.warn("[DealsPage] Drop attempted without data");
      return;
    }

    try {
      const { card, fromCol } = JSON.parse(data);
      console.log(`[DealsPage] Moving deal ${card.id} from ${fromCol} to ${toColId}`);

      if (fromCol === toColId) return;

      // Optimistic UI Update
      setColumns((prev) => ({
        ...prev,
        [fromCol]: {
          ...prev[fromCol],
          cards: prev[fromCol].cards.filter((c) => c.id !== card.id),
        },
        [toColId]: {
          ...prev[toColId],
          cards: [{ ...card, stage: toColId }, ...prev[toColId].cards],
        },
      }));

      // API Update
      await dealsAPI.updateDeal(card.id, { stage: toColId });
      message.success(`Deal moved to ${toColId}`);
    } catch (error) {
      console.error("[DealsPage] Error moving deal:", error);
      message.error("Failed to update deal stage");
      fetchDeals(); // Revert on failure
    }
  };

  const getMenu = (deal) => ({
    items: [
      {
        key: '1',
        label: 'Create Task',
        icon: <CheckCircleOutlined />,
        onClick: () => openTaskModal(deal)
      },
      {
        key: '2',
        label: 'Edit Deal',
        icon: <EditOutlined />,
        onClick: () => message.info("Edit not implemented")
      },
      {
        key: '3',
        label: 'Delete Deal',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: async () => {
          if (window.confirm("Are you sure?")) {
            try {
              await dealsAPI.deleteDeal(deal.id);
              message.success("Deal deleted");
              fetchDeals();
            } catch (e) {
              message.error("Failed to delete");
            }
          }
        }
      }
    ]
  });

  if (loading) return <div className="flex justify-center items-center h-64"><Spin size="large" /></div>;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Pipeline</h1>
          <p className="text-sm text-neutral-500">Manage your deal flow and sales pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search deals..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-200 rounded-lg outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="hidden sm:flex items-center gap-2">
            <FilterOutlined /> Filter
          </Button>
          <Button
            className="flex items-center gap-2 shadow-lg shadow-brand-primary/20"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusOutlined /> New Deal
          </Button>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex gap-4 h-full min-w-[1200px]">
          {Object.entries(columns).map(([colId, col]) => (
            <div
              key={colId}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, colId)}
              className="flex-1 min-w-[280px] max-w-[350px] flex flex-col h-full bg-neutral-50/50 border border-neutral-200/60 rounded-xl"
            >
              {/* Column Header */}
              <div className="p-3 border-b border-neutral-100 bg-white/50 backdrop-blur-sm rounded-t-xl sticky top-0 z-10 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${col.color}`}></div>
                    <h3 className="font-semibold text-neutral-800 text-[13px] uppercase tracking-wide">{col.title}</h3>
                    <span className="bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded text-xs font-medium">{col.cards.length}</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-medium pl-4">Total: {col.total}</div>
                </div>
              </div>

              {/* Cards Container */}
              <div className="flex-1 overflow-y-auto p-2 space-y-3 custom-scrollbar">
                {col.cards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, card, colId)}
                    className="group bg-white p-3 rounded-lg border border-neutral-200/80 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all hover:border-brand-primary/30 relative"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-2">
                        <span className="bg-neutral-50 text-neutral-500 text-[10px] px-2 py-0.5 rounded border border-neutral-100 truncate max-w-[120px]">{card.account_name || 'No Account'}</span>
                        {/* Task Count Badge */}
                        {card.open_task_count > 0 && (
                          <span className="bg-purple-50 text-purple-600 text-[10px] px-1.5 py-0.5 rounded border border-purple-100 flex items-center gap-1">
                            <CheckCircleOutlined style={{ fontSize: '10px' }} /> {card.open_task_count}
                          </span>
                        )}
                      </div>
                      <Dropdown menu={getMenu(card)} trigger={['click']} placement="bottomRight">
                        <button className="text-neutral-400 hover:text-neutral-600 transition-opacity p-1 -mr-1 -mt-1"><MoreOutlined /></button>
                      </Dropdown>
                    </div>

                    <h4 className="font-semibold text-neutral-900 mb-3 line-clamp-2 leading-snug text-sm">{card.name}</h4>

                    <div className="flex items-center justify-between pt-2 border-t border-dashed border-neutral-100">
                      <div className="flex items-center gap-1 text-neutral-600 text-xs font-medium">
                        <DollarOutlined className="text-neutral-400" />
                        {parseFloat(card.amount).toLocaleString()}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[10px] text-neutral-400" title={`Closing: ${card.close_date}`}>
                          <CalendarOutlined /> {card.close_date || '?'}
                        </div>
                        {card.owner_name && (
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-primary to-purple-600 text-white flex items-center justify-center text-[9px] font-bold border border-white shadow-sm" title={`Owner: ${card.owner_name}`}>
                            {card.owner_name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Empty State / Dropzone Hint */}
                {col.cards.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-neutral-200 rounded-lg flex items-center justify-center text-neutral-400 text-xs">
                    Drag deals here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateDealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateDeal}
      />

      {isTaskModalOpen && (
        <TaskForm
          title="Create Task for Deal"
          newTask={newTask}
          setNewTask={setNewTask}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleCreateTask}
          initialContext={taskContext}
        />
      )}
    </div >
  );
}
