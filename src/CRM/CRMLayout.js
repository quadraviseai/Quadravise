import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardPage from "./components/common/dashboard/DashboardPage";
import Contacts from "./components/common/contacts/Contacts";
import Deals from "./components/common/deals/Deals";
import Tasks from "./components/common/tasks/Tasks";
import ProfilePage from "./components/common/profile/ProfilePage";

import Topbar from "./components/common/Topbar";
import Sidebar from "./components/common/Sidebar";

export default function CRMLayout() {
  const [collapsed, setCollapsed] = useState(true);

  const SIDEBAR_COLLAPSED = 72;
  const SIDEBAR_EXPANDED = 220;
  const HEADER_HEIGHT = 64;

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  return (
    <div className="h-screen w-full overflow-hidden bg-neutral-100">
      {/* TOP BAR */}
      <div
        className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center bg-white px-4 shadow-sm"
        style={{ height: HEADER_HEIGHT }}
      >
        <Topbar onToggle={() => setCollapsed((v) => !v)} isOpen={!collapsed} />
      </div>

      {/* SIDEBAR */}
      <div
        className="fixed left-0 top-16 z-10 h-[calc(100vh-64px)] bg-white shadow-sm transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      {/* MAIN CONTENT */}
      <main
        className="ml-[72px] mt-16 h-[calc(100vh-64px)] overflow-y-auto p-4 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="min-h-full rounded-xl bg-white p-4 shadow-sm">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
