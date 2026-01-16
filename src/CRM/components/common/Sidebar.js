import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ collapsed }) {
  const location = useLocation();

  const navItems = [
    { path: "/crm", label: "Dashboard" },
    { path: "/crm/accounts", label: "Accounts" },
    { path: "/crm/contacts", label: "Contacts" },
    { path: "/crm/deals", label: "Deals" },
    { path: "/crm/tasks", label: "Tasks" },
  ];

  return (
    <aside className="flex h-full flex-col border-r border-neutral-200 bg-white">
      {/* NAV */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(item.path + "/");

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-neutral-100 text-black"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                    }
                  `}
                >
                  {/* Icon placeholder (future-safe) */}
                  <span className="mr-3 flex h-5 w-5 items-center justify-center rounded bg-neutral-200 text-xs font-semibold text-neutral-600">
                    {item.label[0]}
                  </span>

                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* FOOTER */}
      {!collapsed && (
        <div className="border-t border-neutral-200 px-4 py-3 text-xs text-neutral-500">
          © 2025 Quadravise CRM
        </div>
      )}
    </aside>
  );
}
