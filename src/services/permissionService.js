import api from './api';

/**
 * Permission Service
 * Manages role-based access to different modules.
 * Uses localStorage to persist configurations.
 */

const PERMISSIONS_KEY = 'quadravise_role_permissions';

// Default Configuration
const DEFAULT_PERMISSIONS = {
    'ADMIN': ['dashboard', 'accounts', 'contacts', 'deals', 'finance', 'tasks', 'users', 'roles', 'config', 'health'],
    'FINANCE_MANAGER': ['dashboard', 'accounts', 'contacts', 'deals', 'finance', 'tasks'],
    'SALES_REP': ['dashboard', 'accounts', 'contacts', 'deals', 'tasks'],
    'VIEWER': ['dashboard']
};

export const permissionService = {
    /**
     * Get all permissions for all roles
     * Fetches from Backend but falls back to LocalStorage/Defaults
     */
    getAllPermissions: async () => {
        try {
            const { data } = await api.get('/auth/users/permissions/');
            // Cache it
            localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(data));
            return data;
        } catch (error) {const stored = localStorage.getItem(PERMISSIONS_KEY);
            return stored ? JSON.parse(stored) : DEFAULT_PERMISSIONS;
        }
    },

    /**
     * Save new permission configuration to Backend
     */
    savePermissions: async (permissions) => {
        try {
            await api.post('/auth/users/permissions/', permissions);
            // Update cache
            localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
            return true;
        } catch (error) {throw error;
        }
    },

    /**
     * Check if a role has access to a specific module key
     * Synchronous check using cached data for performance (Sidebar render)
     * @param {string} role - The user's role
     * @param {string} moduleKey - simple key like 'finance', 'accounts'
     */
    hasAccess: (role, moduleKey) => {
        if (!role) return false;

        let allPerms = {};
        const stored = localStorage.getItem(PERMISSIONS_KEY);
        if (stored) {
            try {
                allPerms = JSON.parse(stored);
            } catch (e) {allPerms = DEFAULT_PERMISSIONS;
            }
        } else {
            allPerms = DEFAULT_PERMISSIONS;
        }

        const rolePerms = allPerms[role] || [];
        return rolePerms.includes(moduleKey);
    },

    /**
     * Rename a role
     */
    renameRole: async (oldName, newName) => {
        try {
            await api.put('/auth/users/permissions/', { oldName, newName });
            // Refresh cache
            await permissionService.getAllPermissions();
            return true;
        } catch (error) {throw error;
        }
    },

    /**
     * Delete a role
     */
    deleteRole: async (roleName) => {
        try {
            await api.delete(`/auth/users/permissions/?role=${roleName}`);
            // Refresh cache
            await permissionService.getAllPermissions();
            return true;
        } catch (error) {throw error;
        }
    },

    /**
     * Get list of modules available for configuration
     */
    getAvailableModules: () => [
        { key: 'dashboard', label: 'Dashboard' },
        { key: 'accounts', label: 'Accounts' },
        { key: 'contacts', label: 'Contacts' },
        { key: 'deals', label: 'Deals' },
        { key: 'finance', label: 'Finance' },
        { key: 'tasks', label: 'Tasks' },
        { key: 'users', label: 'User Management' },
        { key: 'roles', label: 'Role Management' },
        { key: 'config', label: 'System Config' },
        { key: 'health', label: 'System Health' },
    ]
};

export default permissionService;
