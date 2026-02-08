import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Sidebar.module.css";
import permissionService from "../../../services/permissionService";
import {
  AppstoreOutlined,
  BankOutlined,
  TeamOutlined,
  SwapOutlined,
  CheckSquareOutlined,
  UserOutlined,
  SettingOutlined,
  HeartOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';

/**
 * Premium Sidebar Component matching the reference image.
 * Dark theme, Green accents.
 */
export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const { user } = useAuth();
  const [permissionsLoaded, setPermissionsLoaded] = useState(0);

  // Re-check permissions when they might have changed
  // (Triggering rebuild to ensure imports are picked up)
  useEffect(() => {
    const handleUpdate = () => setPermissionsLoaded(n => n + 1);
    window.addEventListener('permissions-updated', handleUpdate);
    return () => window.removeEventListener('permissions-updated', handleUpdate);
  }, []);

  // Define Navigation Sections
  const navSections = [
    {
      title: "MAIN MENU",
      items: [
        { path: "/crm", label: "Dashboard", icon: <AppstoreOutlined />, key: 'dashboard' },
      ]
    },
    {
      title: "CRM",
      items: [
        { path: "/crm/accounts", label: "Accounts", icon: <BankOutlined />, key: 'accounts' },
        { path: "/crm/contacts", label: "Contacts", icon: <TeamOutlined />, key: 'contacts' },
        { path: "/crm/deals", label: "Deals", icon: <SwapOutlined />, key: 'deals' },
        { path: "/crm/tasks", label: "Tasks", icon: <CheckSquareOutlined />, key: 'tasks' },
      ]
    },
    {
      title: "FINANCE",
      items: [
        { path: "/crm/finance", label: "Finance", icon: <BankOutlined />, key: 'finance' },
      ]
    },
    {
      title: "ADMINISTRATION",
      items: [
        { path: "/crm/users", label: "User Management", icon: <UserOutlined />, key: 'users' },
        { path: "/crm/roles", label: "Role Management", icon: <SafetyCertificateOutlined />, key: 'roles' },
        { path: "/crm/config", label: "Config", icon: <SettingOutlined />, key: 'config' },
        { path: "/crm/sys-health", label: "System Health", icon: <HeartOutlined />, key: 'health' },
      ]
    }
  ];

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Brand Section */}
      <div className={styles.brandSection}>
        {collapsed ? (
          // Collapsed: Logo acts as Expand Button
          <button
            className={styles.logoBtn}
            onClick={onToggle}
            title="Expand Sidebar"
          >
            <img src="/logo01.png" alt="Q" className={styles.logoImage} />
          </button>
        ) : (
          // Expanded: Show Logo + Collapse Button
          <>
            <div className={styles.brandLogo}>
              <img src="/logo01.png" alt="Quadravise" className={styles.logoImage} />
              <div className={styles.brandText}>
                <div className={styles.brandName}>Quadravise</div>
                <div className={styles.brandTagline}>CRM Suite</div>
              </div>
            </div>

            <button
              className={styles.toggleBtn}
              onClick={onToggle}
              title="Collapse Sidebar"
            >
              <MenuFoldOutlined />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {navSections.map((section) => {
          // Filter items by permission
          const filteredItems = section.items.filter(item => user && permissionService.hasAccess(user.role, item.key));

          if (filteredItems.length === 0) return null;

          return (
            <div key={section.title} className={styles.navSection}>
              {!collapsed && <h3 className={styles.sectionHeader}>{section.title}</h3>}
              <ul className={styles.navList}>
                {filteredItems.map((item) => {
                  const isActive = item.path === "/crm"
                    ? location.pathname === "/crm" || location.pathname === "/crm/"
                    : location.pathname === item.path || location.pathname.startsWith(item.path + "/");

                  return (
                    <li key={item.label} className={styles.navItem}>
                      <Link
                        to={item.path}
                        className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                        title={collapsed ? item.label : undefined}
                      >
                        <span className={styles.navIcon}>{item.icon}</span>
                        {!collapsed && (
                          <>
                            <span className={styles.navLabel}>{item.label}</span>
                            {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
                          </>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Sign Out Section */}
      <div className={styles.footer}>
        <button className={styles.signOutBtn} onClick={() => console.log("Logout")}>
          <span className={styles.navIcon}><LogoutOutlined /></span>
          {!collapsed && <span className={styles.navLabel}>SIGN OUT</span>}
        </button>
      </div>
    </aside>
  );
}
