import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardPage from "./components/common/dashboard/DashboardPage";
import Contacts from "./components/common/contacts/Contacts";
import Deals from "./components/common/deals/Deals";
import DealDetailsPage from "./components/common/deals/DealDetails";
import Tasks from "./components/common/tasks/Tasks";
import ProfilePage from "./components/common/profile/ProfilePage";
import SystemHealth from "./components/common/SystemHealth";

import Users from "./components/users/Users";
import AccountsPage from "./components/common/accounts/Accounts";
import AccountDetailsPage from "./components/common/accounts/AccountDetails";
import SettingsPage from "./components/common/settings/Settings";
import RoleManagement from "./components/users/RoleManagement";
import FinanceDashboard from "./components/common/finance/FinanceDashboard";

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
        className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center bg-white shadow-sm"
        style={{ height: HEADER_HEIGHT }}
      >
        <Topbar onToggle={() => setCollapsed((v) => !v)} isOpen={!collapsed} />
      </div>

      {/* SIDEBAR */}
      <div
        className="fixed left-0 top-16 z-10 h-[calc(100vh-64px)] transition-all duration-300"
        style={{
          width: sidebarWidth,
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.12)'
        }}
      >
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      </div>

      {/* MAIN CONTENT */}
      <main
        className="ml-[72px] mt-16 h-[calc(100vh-64px)] overflow-y-auto transition-all duration-300 bg-neutral-100 p-6"
        style={{ marginLeft: sidebarWidth }}
      >
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/deals/:id" element={<DealDetailsPage />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/sys-health" element={<SystemHealth />} />

          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/accounts/:id" element={<AccountDetailsPage />} />
          <Route path="/finance" element={<FinanceDashboard />} />
          <Route path="/config" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}
