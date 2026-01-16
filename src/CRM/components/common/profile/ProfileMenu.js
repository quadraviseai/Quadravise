import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ open, onClose, onLogout }) {
  const navigate = useNavigate();
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose?.();
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  function go(path) {
    navigate(path);
    onClose?.();
  }

  return (
    <div
      ref={ref}
      className="absolute right-0 mt-2 w-44 rounded-lg border border-neutral-200 bg-white shadow-lg z-50"
    >
      <button
        onClick={() => go("/crm/profile")}
        className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-100"
      >
        Profile
      </button>

      <button
        onClick={() => go("/crm/settings")}
        className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-100"
      >
        Settings
      </button>

      <div className="my-1 border-t border-neutral-200" />

      <button
        onClick={() => {
          onLogout?.();
          onClose?.();
        }}
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
      >
        Log out
      </button>
    </div>
  );
}
