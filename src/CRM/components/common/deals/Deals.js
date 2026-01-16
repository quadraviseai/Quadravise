import { useState } from "react";

const initialColumns = {
  backlog: {
    id: "backlog",
    title: "Backlog",
    cards: [
      { id: "d1", title: "Lead: Acme Corp", amount: "₹120k" },
      { id: "d2", title: "Proposal: Beta Ltd", amount: "₹48k" },
    ],
  },
  progress: {
    id: "progress",
    title: "In Progress",
    cards: [{ id: "d3", title: "Negotiation: Gamma", amount: "₹200k" }],
  },
  won: {
    id: "won",
    title: "Won",
    cards: [{ id: "d4", title: "Closed: Delta Inc", amount: "₹500k" }],
  },
  lost: {
    id: "lost",
    title: "Lost",
    cards: [{ id: "d5", title: "Lost: Echo", amount: "₹30k" }],
  },
};

export default function DealsPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [modalOpen, setModalOpen] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: "",
    amount: "",
    stage: "backlog",
  });

  const onDragStart = (e, card, fromCol) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ card, fromCol }));
  };

  const onDrop = (e, toCol) => {
    e.preventDefault();
    const { card, fromCol } = JSON.parse(e.dataTransfer.getData("text/plain"));

    if (fromCol === toCol) return;

    setColumns((prev) => ({
      ...prev,
      [fromCol]: {
        ...prev[fromCol],
        cards: prev[fromCol].cards.filter((c) => c.id !== card.id),
      },
      [toCol]: {
        ...prev[toCol],
        cards: [{ ...card }, ...prev[toCol].cards],
      },
    }));
  };

  const addDeal = () => {
    if (!newDeal.title) return;

    setColumns((prev) => ({
      ...prev,
      [newDeal.stage]: {
        ...prev[newDeal.stage],
        cards: [
          {
            id: `d${Date.now()}`,
            title: newDeal.title,
            amount: newDeal.amount,
          },
          ...prev[newDeal.stage].cards,
        ],
      },
    }));

    setNewDeal({ title: "", amount: "", stage: "backlog" });
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Deals</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          New Deal
        </button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-4 gap-4">
        {Object.values(columns).map((col) => (
          <div
            key={col.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, col.id)}
            className="rounded-lg bg-neutral-100 p-3"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-medium">{col.title}</span>
              <span className="text-xs text-neutral-500">
                {col.cards.length}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {col.cards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, card, col.id)}
                  className="cursor-grab rounded-md bg-white p-3 shadow-sm"
                >
                  <div className="text-sm font-medium">{card.title}</div>
                  <div className="mt-1 text-xs text-neutral-500">
                    {card.amount || "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-96 rounded-lg bg-white p-4">
            <h3 className="mb-3 font-semibold">New Deal</h3>

            <input
              className="mb-2 w-full rounded border px-3 py-2"
              placeholder="Deal title"
              value={newDeal.title}
              onChange={(e) =>
                setNewDeal((s) => ({ ...s, title: e.target.value }))
              }
            />

            <input
              className="mb-2 w-full rounded border px-3 py-2"
              placeholder="Amount"
              value={newDeal.amount}
              onChange={(e) =>
                setNewDeal((s) => ({ ...s, amount: e.target.value }))
              }
            />

            <select
              className="mb-3 w-full rounded border px-3 py-2"
              value={newDeal.stage}
              onChange={(e) =>
                setNewDeal((s) => ({ ...s, stage: e.target.value }))
              }
            >
              <option value="backlog">Backlog</option>
              <option value="progress">In Progress</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded px-3 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={addDeal}
                className="rounded bg-black px-4 py-2 text-sm text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
