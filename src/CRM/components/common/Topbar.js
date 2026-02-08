import { useState, useEffect } from 'react';
import {
  HomeFilled,
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  AppstoreOutlined,
  BankOutlined,
  TeamOutlined,
  SwapOutlined,
  CheckSquareOutlined,
  HeartOutlined,
  CaretDownOutlined,
  PlusCircleOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { useAuth } from '../../../context/AuthContext';
import styles from './Topbar.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Topbar({ onToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [pageTitle, setPageTitle] = useState({ title: "Dashboard", icon: <HomeFilled /> });
  const [moduleName, setModuleName] = useState("SALES");

  useEffect(() => {
    const path = location.pathname;

    // Determine Page Title & Icon
    if (path.includes('/crm/contacts')) {
      setPageTitle({ title: "Contacts", icon: <TeamOutlined /> });
      setModuleName("SALES");
    }
    else if (path.includes('/crm/accounts')) {
      setPageTitle({ title: "Accounts", icon: <BankOutlined /> });
      setModuleName("SALES");
    }
    else if (path.includes('/crm/deals')) {
      setPageTitle({ title: "Deals", icon: <SwapOutlined /> });
      setModuleName("SALES");
    }
    else if (path.includes('/crm/tasks')) {
      setPageTitle({ title: "Tasks", icon: <CheckSquareOutlined /> });
      setModuleName("SALES");
    }
    else if (path.includes('/crm/finance')) {
      setPageTitle({ title: "Finance Dashboard", icon: <BankOutlined /> });
      setModuleName("FINANCE");
    }
    else if (path.includes('/crm/users')) {
      setPageTitle({ title: "User Management", icon: <UserOutlined /> });
      setModuleName("ADMINISTRATION");
    }
    else if (path.includes('/crm/roles')) {
      setPageTitle({ title: "Role Management", icon: <SafetyCertificateOutlined /> });
      setModuleName("ADMINISTRATION");
    }
    else if (path.includes('/crm/config')) {
      setPageTitle({ title: "Settings", icon: <SettingOutlined /> });
      setModuleName("ADMINISTRATION");
    }
    else if (path.includes('/crm/sys-health')) {
      setPageTitle({ title: "System Health", icon: <HeartOutlined /> });
      setModuleName("ADMINISTRATION");
    }
    else {
      setPageTitle({ title: "Dashboard", icon: <AppstoreOutlined /> });
      setModuleName("SALES");
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {}
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) return `${user.firstName[0]}${user.lastName[0]}`;
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  };

  const getDisplayName = () => {
    let name = '';
    if (user?.firstName) {
      name = `${user.firstName} ${user.lastName || ''}`;
    } else {
      name = user?.email?.split('@')[0] || 'User';
    }
    // Capitalize first letter of each word
    return name.replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className={styles.topbar}>
      {/* LEFT: Branding & Navigation */}
      <div className={styles.leftSection}>
        {/* Brand Dropdown - Navigates to Dashboard */}
        <div
          className={styles.brandButton}
          onClick={() => navigate('/crm')}
          title="Go to Dashboard"
          style={{ cursor: 'pointer' }}
        >
          <AppstoreOutlined />
          <span>Quadravise CRM</span>
        </div>

        <div className={styles.separator}></div>

        {/* Module (Dynamic) */}
        <div className={styles.navButton} style={{ cursor: 'default' }}>
          {moduleName}
        </div>

        {/* Page Title */}
        <div className={styles.pageTitleButton} style={{ cursor: 'default' }}>
          {pageTitle.title}
        </div>
      </div>

      {/* RIGHT: Tools & Profile */}
      <div className={styles.searchSection}>
        {/* Search */}
        <div className={styles.searchContainer}>
          <input
            type="search"
            placeholder="Enter Search Item"
            className={styles.searchInput}
          />
          <SearchOutlined className={styles.searchIcon} />
        </div>
      </div>

      <div className={styles.rightSection}>
        {/* Profile */}
        <div className="relative">
          <button
            className={styles.profileBtn}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className={styles.userInfo}>
              <span className={styles.userName}>{getDisplayName()}</span>
              <span className={styles.userRole}>{user?.role?.replace('_', '') || 'COBALTDEMO'}</span>
            </div>
            <div className={styles.avatar}>
              <UserOutlined />
            </div>
          </button>

          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)}></div>
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>
                  <div className="font-semibold text-neutral-900">{getDisplayName()}</div>
                  <div className="text-xs text-neutral-500">{user?.email}</div>
                </div>
                <Link to="/crm/profile" className={styles.dropdownItem} onClick={() => setShowProfileMenu(false)}>
                  <UserOutlined className="mr-2" /> My Profile
                </Link>
                <Link to="/crm/config" className={styles.dropdownItem} onClick={() => setShowProfileMenu(false)}>
                  <SettingOutlined className="mr-2" /> Settings
                </Link>
                <div className="h-px bg-neutral-100 my-1"></div>
                <button
                  className={`${styles.dropdownItem} text-red-600`}
                  onClick={handleLogout}
                >
                  <LogoutOutlined className="mr-2" /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>

        {/* Settings */}
        <button
          className={styles.settingsBtn}
          onClick={() => navigate('/crm/config')}
          title="Settings"
        >
          <SettingOutlined />
        </button>
      </div>
    </div>
  );
}
