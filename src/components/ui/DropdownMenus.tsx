import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, SettingsIcon, LogOutIcon, BellIcon, MailIcon, DollarSignIcon, PlusIcon, CheckIcon, InfoIcon, ExternalLinkIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
interface DropdownProps {
  show: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}
export const Dropdown: React.FC<DropdownProps> = ({
  show,
  position = 'top-right',
  onClose,
  children,
  className = ''
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Handle click outside to close dropdown
  useEffect(() => {
    if (!show) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose]);
  if (!show) return null;
  const positionClasses = {
    'top-right': 'top-full right-0 mt-2',
    'top-left': 'top-full left-0 mt-2',
    'bottom-right': 'bottom-full right-0 mb-2',
    'bottom-left': 'bottom-full left-0 mb-2'
  };
  return <div ref={dropdownRef} className={`absolute z-50 w-72 rounded-xl overflow-hidden glass-effect shadow-lg border border-white/20 dark:border-gray-700/30 animate-in fade-in slide-in-from-top-3 duration-200 ${positionClasses[position]} ${className}`}>
      {children}
    </div>;
};
export const ProfileMenu: React.FC = () => {
  const {
    showProfileMenu,
    toggleProfileMenu,
    user
  } = useAppContext();
  const navigate = useNavigate();
  // Handle navigation for menu items
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleProfileMenu(); // Close the menu
    // Use setTimeout to ensure the menu closes before navigation
    setTimeout(() => {
      navigate(path);
    }, 10);
  };
  // Handle logout
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleProfileMenu();
    // Use setTimeout to ensure the menu closes before navigation
    setTimeout(() => {
      // Add any logout logic here (clear tokens, etc.)
      navigate('/auth/login');
    }, 10);
  };
  return <Dropdown show={showProfileMenu} position="top-right" onClose={toggleProfileMenu}>
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <img src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'} alt={`${user?.name || 'User'} avatar`} className="w-14 h-14 rounded-full object-cover border-2 border-white/10 dark:border-gray-700/50 shadow-md" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white text-base">
              {user?.name || 'User'}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {user?.email || 'user@example.com'}
            </p>
          </div>
        </div>
      </div>
      <div className="py-2">
        <button onClick={e => handleNavigation(e, '/profile')} className="flex items-center w-full px-5 py-2.5 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 transition-colors duration-150">
          <UserIcon size={18} className="mr-3 text-gray-500 dark:text-gray-400" />
          Your Profile
        </button>
        <button onClick={e => handleNavigation(e, '/settings')} className="flex items-center w-full px-5 py-2.5 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 transition-colors duration-150">
          <SettingsIcon size={18} className="mr-3 text-gray-500 dark:text-gray-400" />
          Settings
        </button>
        <div className="border-t border-gray-200 dark:border-gray-700 my-1.5"></div>
        <button className="flex items-center w-full text-left px-5 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 transition-colors duration-150" onClick={handleLogout}>
          <LogOutIcon size={18} className="mr-3" />
          Sign Out
        </button>
      </div>
    </Dropdown>;
};
export const NotificationsMenu: React.FC = () => {
  const {
    showNotifications,
    toggleNotifications
  } = useAppContext();
  const navigate = useNavigate();
  // Mock notifications data
  const notifications = [{
    id: 1,
    title: 'New follower',
    message: 'Someone started following your account',
    time: '2 hours ago',
    read: false
  }, {
    id: 2,
    title: 'Content published',
    message: 'Your video "10 Productivity Tips" is now live',
    time: '5 hours ago',
    read: false
  }, {
    id: 3,
    title: 'Reminder',
    message: 'You have a scheduled post in 30 minutes',
    time: 'Yesterday',
    read: true
  }];
  const handleMarkAllAsRead = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add logic to mark all notifications as read
  };
  const handleViewAllNotifications = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleNotifications(); // Close the menu
    // Use setTimeout to ensure the menu closes before navigation
    setTimeout(() => {
      navigate('/notifications');
    }, 10);
  };
  return <Dropdown show={showNotifications} position="top-right" onClose={toggleNotifications}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-900 dark:text-white text-base">
          Notifications
        </h3>
        <button className="text-xs text-[#3FE0A5] hover:underline font-medium transition-colors duration-150" onClick={handleMarkAllAsRead}>
          Mark all as read
        </button>
      </div>
      <div className="max-h-[350px] overflow-y-auto">
        {notifications.length > 0 ? <div>
            {notifications.map(notification => <div key={notification.id} className={`p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 transition-colors duration-150 ${notification.read ? '' : 'bg-[#3FE0A5]/5'}`}>
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                    {notification.time}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1.5">
                  {notification.message}
                </p>
              </div>)}
          </div> : <div className="p-5 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No notifications yet
            </p>
          </div>}
      </div>
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
        <button onClick={handleViewAllNotifications} className="flex items-center justify-center w-full text-sm text-[#3FE0A5] hover:text-[#38B897] font-medium transition-colors duration-150 py-1">
          View all notifications
          <ExternalLinkIcon size={14} className="ml-1.5" />
        </button>
      </div>
    </Dropdown>;
};
export const MailboxMenu: React.FC = () => {
  const {
    showMailbox,
    toggleMailbox
  } = useAppContext();
  const navigate = useNavigate();
  // Mock messages data
  const messages = [{
    id: 1,
    sender: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60',
    message: 'Can you send me the latest design files?',
    time: '10:42 AM',
    read: false
  }, {
    id: 2,
    sender: 'Alex Wong',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
    message: 'Great job on the presentation yesterday!',
    time: '9:30 AM',
    read: true
  }, {
    id: 3,
    sender: 'Marketing Team',
    avatar: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=150&auto=format&fit=crop&q=60',
    message: 'We need to discuss the campaign metrics',
    time: 'Yesterday',
    read: true
  }];
  const handleMarkAllAsRead = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add logic to mark all messages as read
  };
  const handleViewAllMessages = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMailbox(); // Close the menu
    // Use setTimeout to ensure the menu closes before navigation
    setTimeout(() => {
      navigate('/messages');
    }, 10);
  };
  return <Dropdown show={showMailbox} position="top-right" onClose={toggleMailbox}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-900 dark:text-white text-base">
          Messages
        </h3>
        <button className="text-xs text-[#3FE0A5] hover:underline font-medium transition-colors duration-150" onClick={handleMarkAllAsRead}>
          Mark all as read
        </button>
      </div>
      <div className="max-h-[350px] overflow-y-auto">
        {messages.length > 0 ? <div>
            {messages.map(message => <div key={message.id} className={`p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 transition-colors duration-150 ${message.read ? '' : 'bg-[#3FE0A5]/5'}`}>
                <div className="flex gap-3">
                  <img src={message.avatar} alt={`${message.sender}'s avatar`} className="w-10 h-10 rounded-full object-cover shadow-sm flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {message.sender}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                        {message.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1.5 truncate">
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>)}
          </div> : <div className="p-5 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No messages yet
            </p>
          </div>}
      </div>
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
        <button onClick={handleViewAllMessages} className="flex items-center justify-center w-full text-sm text-[#3FE0A5] hover:text-[#38B897] font-medium transition-colors duration-150 py-1">
          View all messages
          <ExternalLinkIcon size={14} className="ml-1.5" />
        </button>
      </div>
    </Dropdown>;
};
export const CreditsMenu: React.FC = () => {
  const {
    showCreditsMenu,
    toggleCreditsMenu,
    setShowCreditsMenu,
    user
  } = useAppContext();
  const navigate = useNavigate();
  // Mock credit transactions
  const transactions = [{
    id: 1,
    type: 'usage',
    amount: -15,
    description: 'Video generation',
    date: '2 hours ago'
  }, {
    id: 2,
    type: 'usage',
    amount: -8,
    description: 'Image generation',
    date: 'Yesterday'
  }, {
    id: 3,
    type: 'topup',
    amount: 100,
    description: 'Credit purchase',
    date: '3 days ago'
  }];
  // Handle navigation with improved approach
  const navigateToPath = (path: string) => {
    // Directly set menu to closed state instead of toggling
    if (setShowCreditsMenu) {
      setShowCreditsMenu(false);
    } else {
      // Fallback to toggle if direct setter isn't available
      if (showCreditsMenu) {
        toggleCreditsMenu();
      }
    }
    // Use setTimeout with a slightly longer delay to ensure React state updates first
    setTimeout(() => {
      // Use window.location for direct navigation as a fallback approach
      // This bypasses potential React Router issues
      window.location.href = path;
    }, 150);
  };
  // Handle buying credits with complete event handling
  const handleBuyCredits = (e: React.MouseEvent) => {
    // Prevent default behavior and stop propagation
    e.preventDefault();
    e.stopPropagation();
    // Navigate to credits page
    navigateToPath('/credits/add');
  };
  // Handle viewing all transactions with complete event handling
  const handleViewTransactions = (e: React.MouseEvent) => {
    // Prevent default behavior and stop propagation
    e.preventDefault();
    e.stopPropagation();
    // Navigate to transactions page
    navigateToPath('/credits/transactions');
  };
  return <Dropdown show={showCreditsMenu} position="top-right" onClose={toggleCreditsMenu}>
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Current Balance
          </span>
          <h3 className="text-3xl font-bold text-[#3FE0A5] mt-1">
            {user?.credits || 0}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Credits
          </span>
        </div>
      </div>
      <div className="max-h-[250px] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-medium">
            Recent Transactions
          </h4>
          {transactions.map(transaction => <div key={transaction.id} className="flex justify-between items-center py-2.5 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 px-2 -mx-2 rounded-lg transition-colors duration-150">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm ${transaction.type === 'topup' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                  {transaction.type === 'topup' ? <PlusIcon size={14} /> : <DollarSignIcon size={14} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <span className={`text-sm font-medium ${transaction.type === 'topup' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}
              </span>
            </div>)}
        </div>
      </div>
      <div className="p-4 space-y-3">
        {/* Use a standard <a> tag as a fallback approach */}
        <a href="/credits/add" className="block w-full py-2.5 px-4 text-center text-sm text-white bg-gradient-to-r from-[#3FE0A5] to-[#38B897] hover:brightness-105 active:brightness-95 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md hover:shadow-[#3FE0A5]/10 active:scale-[0.98]" onClick={handleBuyCredits}>
          Buy More Credits
        </a>
        <a href="/credits/transactions" className="block w-full py-2.5 px-4 text-center text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow active:scale-[0.98]" onClick={handleViewTransactions}>
          View All Transactions
        </a>
      </div>
    </Dropdown>;
};