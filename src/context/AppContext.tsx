import React, { useCallback, useEffect, useState, createContext, useContext } from 'react';
type UserRole = 'admin' | 'editor' | 'viewer';
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  username: string;
  role: UserRole;
  isAdmin: boolean;
  credits: number;
}
interface AppContextType {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  // User data
  user: User | null;
  setUser: (user: User | null) => void;
  // UI states
  showProfileMenu: boolean;
  showNotifications: boolean;
  showMailbox: boolean;
  showCreditsMenu: boolean;
  // UI state toggles
  toggleProfileMenu: () => void;
  toggleNotifications: () => void;
  toggleMailbox: () => void;
  toggleCreditsMenu: () => void;
  closeAllMenus: () => void;
  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  // Content creation
  showContentCreationModal: boolean;
  toggleContentCreationModal: () => void;
  // Add direct setter for menu state
  setShowCreditsMenu?: (show: boolean) => void;
}
const defaultUser: User = {
  id: '1',
  name: 'Nathan Collins',
  email: 'nathan@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
  username: 'nathan_collins',
  role: 'admin',
  isAdmin: true,
  credits: 120
};
const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);
  // User state
  const [user, setUser] = useState<User | null>(null);
  // UI states
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMailbox, setShowMailbox] = useState(false);
  const [showCreditsMenu, setShowCreditsMenu] = useState(false);
  const [showContentCreationModal, setShowContentCreationModal] = useState(false);
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  // Theme toggle function
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Save preference to localStorage
      localStorage.setItem('darkMode', newMode ? 'true' : 'false');
      return newMode;
    });
  }, []);
  // Apply theme based on localStorage or system preference on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      const darkModePreferred = savedTheme === 'true';
      setIsDarkMode(darkModePreferred);
      if (darkModePreferred) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Check system preference if no saved preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);
  // Load user data from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(defaultUser);
      }
    }
  }, []);
  // Toggle UI state functions
  const toggleProfileMenu = useCallback(() => {
    setShowProfileMenu(prev => !prev);
    setShowNotifications(false);
    setShowMailbox(false);
    setShowCreditsMenu(false);
  }, []);
  const toggleNotifications = useCallback(() => {
    setShowNotifications(prev => !prev);
    setShowProfileMenu(false);
    setShowMailbox(false);
    setShowCreditsMenu(false);
  }, []);
  const toggleMailbox = useCallback(() => {
    setShowMailbox(prev => !prev);
    setShowProfileMenu(false);
    setShowNotifications(false);
    setShowCreditsMenu(false);
  }, []);
  const toggleCreditsMenu = useCallback(() => {
    setShowCreditsMenu(prev => !prev);
    setShowProfileMenu(false);
    setShowNotifications(false);
    setShowMailbox(false);
  }, []);
  const toggleContentCreationModal = useCallback(() => {
    setShowContentCreationModal(prev => !prev);
  }, []);
  const closeAllMenus = useCallback(() => {
    setShowProfileMenu(false);
    setShowNotifications(false);
    setShowMailbox(false);
    setShowCreditsMenu(false);
  }, []);
  // Click outside handler to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if one of the menus is open
      if (showProfileMenu || showNotifications || showMailbox || showCreditsMenu) {
        // Check if the click is on a menu toggle button
        const target = event.target as HTMLElement;
        if (target.closest('[data-menu-toggle]')) {
          return;
        }
        // Close all menus if click is outside
        closeAllMenus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu, showNotifications, showMailbox, showCreditsMenu, closeAllMenus]);
  // Context value with added setter
  const contextValue: AppContextType = {
    isDarkMode,
    toggleDarkMode: () => setIsDarkMode(!isDarkMode),
    user,
    showNotificationsMenu: showNotifications,
    toggleNotificationsMenu: () => setShowNotifications(!showNotifications),
    showCreditsMenu,
    toggleCreditsMenu: () => setShowCreditsMenu(!showCreditsMenu),
    setShowCreditsMenu,
    showProfileMenu,
    showMailbox,
    toggleProfileMenu,
    toggleMailbox,
    closeAllMenus,
    isLoading,
    setIsLoading,
    showContentCreationModal,
    toggleContentCreationModal
  };
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};