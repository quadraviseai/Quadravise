import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onToggle, isOpen }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          aria-label="Toggle sidebar"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 hover:bg-neutral-100"
        >
          <span className="sr-only">Toggle sidebar</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-4 bg-black"></span>
            <span className="block h-0.5 w-4 bg-black"></span>
            <span className="block h-0.5 w-4 bg-black"></span>
          </div>
        </button>

        <span className="text-sm font-semibold text-black">QuadraCRM</span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* SEARCH */}
        <input
          type="search"
          placeholder="Search"
          className="hidden sm:block h-9 w-56 rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-black"
        />

        {/* PROFILE */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 px-2 py-1 hover:bg-neutral-100"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-300 text-xs font-medium">
              H
            </div>
            <span className="hidden sm:block text-sm">Harsha</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg border border-neutral-200 bg-white shadow-sm">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/crm/profile");
                }}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-neutral-100"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/crm/settings");
                }}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-neutral-100"
              >
                Settings
              </button>

              <div className="my-1 h-px bg-neutral-200" />

              <button
                onClick={() => {
                  setOpen(false);
                  // TODO: hook logout logic
                  console.log("Logout");
                }}
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
