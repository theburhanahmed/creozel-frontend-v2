import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BarChart2Icon, CalendarIcon, MessageSquareIcon, UsersIcon, PenToolIcon, RocketIcon, GlobeIcon, FolderIcon, FileTextIcon, ImageIcon, VideoIcon, MicIcon, SettingsIcon, HelpCircleIcon, SearchIcon, BellIcon, MailIcon, MenuIcon, XIcon, ChevronDownIcon, DollarSignIcon, SparklesIcon, SunIcon, MoonIcon, ChevronRightIcon } from 'lucide-react';
import { FocusTrap } from '../ui/AccessibilityUtils';
import { cn } from '../../lib/utils';
import { useAppContext } from '../../context/AppContext';
import { ProfileMenu, NotificationsMenu, MailboxMenu, CreditsMenu } from '../ui/DropdownMenus';
interface NavigationItem {
  icon: React.ReactNode;
  title: string;
  href: string;
  children?: NavigationItem[];
  description?: string;
}
interface QuickAction {
  icon: React.ReactNode;
  title: string;
  href: string;
  color?: string;
  onClick?: () => void;
}
export const MainNavigation: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const {
    isDarkMode,
    toggleDarkMode,
    toggleProfileMenu,
    toggleNotifications,
    toggleMailbox,
    toggleCreditsMenu,
    showProfileMenu,
    showNotifications,
    showMailbox,
    showCreditsMenu,
    user
  } = useAppContext();
  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);
  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);
  // Handle escape key to close sidebar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen]);
  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  // Toggle expanded state for sidebar items
  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]);
  };
  // Main navigation items with dropdowns
  const navigationItems: NavigationItem[] = [{
    icon: <HomeIcon size={18} />,
    title: 'Dashboard',
    href: '/'
  }, {
    icon: <PenToolIcon size={18} />,
    title: 'AI Content Tools',
    href: '/content'
  }, {
    icon: <RocketIcon size={18} />,
    title: 'Autopilot',
    href: '/autopilot',
    children: [{
      icon: <SparklesIcon size={16} />,
      title: 'Dashboard',
      href: '/autopilot',
      description: 'Overview of your content automation'
    }, {
      icon: <PenToolIcon size={16} />,
      title: 'Create Pipeline',
      href: '/autopilot/create',
      description: 'Set up new content automation'
    }, {
      icon: <VideoIcon size={16} />,
      title: 'Video Generator',
      href: '/autopilot/video-generator',
      description: 'Automatically generate videos'
    }, {
      icon: <FileTextIcon size={16} />,
      title: 'Custom Templates',
      href: '/autopilot/templates',
      description: 'Manage your content templates'
    }, {
      icon: <CalendarIcon size={16} />,
      title: 'Post Scheduler',
      href: '/autopilot/scheduler',
      description: 'Schedule your content posts'
    }, {
      icon: <FolderIcon size={16} />,
      title: 'Media Library',
      href: '/autopilot/media',
      description: 'Manage your media assets'
    }, {
      icon: <BarChart2Icon size={16} />,
      title: 'Analytics',
      href: '/autopilot/analytics',
      description: 'Track engagement and performance'
    }]
  }, {
    icon: <FolderIcon size={18} />,
    title: 'Media',
    href: '/media'
  }, {
    icon: <BarChart2Icon size={18} />,
    title: 'Analytics',
    href: '/analytics'
  }, {
    icon: <CalendarIcon size={18} />,
    title: 'Calendar',
    href: '/calendar'
  }, {
    icon: <MessageSquareIcon size={18} />,
    title: 'Messages',
    href: '/messages'
  }, {
    icon: <UsersIcon size={18} />,
    title: 'Team',
    href: '/team'
  }, {
    icon: <GlobeIcon size={18} />,
    title: 'Social',
    href: '/social-accounts'
  }];
  // Quick actions
  const quickActions: QuickAction[] = [{
    icon: <PenToolIcon size={18} />,
    title: 'New Content',
    href: '/content',
    color: 'from-blue-500 to-indigo-600'
  }, {
    icon: <RocketIcon size={18} />,
    title: 'New Pipeline',
    href: '/autopilot/create',
    color: 'from-purple-500 to-pink-600'
  }, {
    icon: <DollarSignIcon size={18} />,
    title: 'Affiliate',
    href: '/affiliate',
    color: 'from-amber-500 to-orange-600'
  }];
  return <>
      {/* Enhanced Header with improved glass effect */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl mx-4 mt-4 rounded-2xl shadow-2xl border border-gray-200/70 dark:border-gray-700/70 hover:shadow-3xl transition-all duration-300">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Logo and Menu Toggle */}
            <div className="flex items-center gap-4">
              <button className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95 group" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-expanded={isSidebarOpen} aria-label="Toggle menu">
                <MenuIcon size={22} className="text-gray-700 dark:text-gray-300 group-hover:text-[#3FE0A5] transition-colors duration-200" />
              </button>
              <Link to="/" className="flex items-center group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#3FE0A5] to-[#38B897] flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-[#3FE0A5]/30 group-hover:shadow-2xl group-hover:shadow-[#3FE0A5]/40 transition-all duration-300 group-hover:scale-105">
                  C
                </div>
                <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-[#3FE0A5] to-[#38B897] text-transparent bg-clip-text transition-all duration-300 group-hover:tracking-wide">
                  Creozel
                </h1>
              </Link>
            </div>
            {/* Right Side - User Controls */}
            <div className="flex items-center gap-3">
              {/* Credits */}
              <div className="relative">
                <button className="flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 active:scale-95 border border-gray-200/70 dark:border-gray-600/70 group" onClick={toggleCreditsMenu} aria-expanded={showCreditsMenu} data-menu-toggle="credits">
                  <span className="text-sm font-semibold text-[#3FE0A5] group-hover:text-[#38B897] transition-colors duration-200">
                    Credits:
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {user?.credits || 0}
                  </span>
                </button>
                <CreditsMenu />
              </div>
              {/* Notifications */}
              <div className="relative">
                <button className="relative w-11 h-11 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95 group" onClick={toggleNotifications} aria-expanded={showNotifications} aria-label="Notifications" data-menu-toggle="notifications">
                  <BellIcon size={22} className="text-gray-700 dark:text-gray-300 group-hover:text-[#3FE0A5] transition-colors duration-200" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse shadow-lg shadow-red-500/50"></span>
                </button>
                <NotificationsMenu />
              </div>
              {/* Messages */}
              <div className="relative">
                <button className="relative w-11 h-11 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95 group" onClick={toggleMailbox} aria-expanded={showMailbox} aria-label="Messages" data-menu-toggle="mailbox">
                  <MailIcon size={22} className="text-gray-700 dark:text-gray-300 group-hover:text-[#3FE0A5] transition-colors duration-200" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse shadow-lg shadow-blue-500/50"></span>
                </button>
                <MailboxMenu />
              </div>
              {/* Theme Toggle */}
              <button onClick={toggleDarkMode} className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 active:scale-95 overflow-hidden group" aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                {isDarkMode ? <SunIcon size={22} className="text-amber-500 animate-in fade-in duration-300 group-hover:rotate-45 transition-transform duration-300" /> : <MoonIcon size={22} className="text-gray-700 animate-in fade-in duration-300 group-hover:-rotate-12 transition-transform duration-300" />}
              </button>
              {/* User Profile */}
              <div className="relative">
                <button className="w-11 h-11 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-[#3FE0A5]/40 hover:border-[#3FE0A5]/60 transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg" onClick={toggleProfileMenu} aria-expanded={showProfileMenu} aria-label="User menu" data-menu-toggle="profile">
                  <img src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'} alt={`${user?.name || 'User'} avatar`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                </button>
                <ProfileMenu />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Sidebar Navigation */}
      <>
        {/* Enhanced Backdrop */}
        {isSidebarOpen && <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-40 animate-in fade-in duration-300" aria-hidden="true" onClick={() => setIsSidebarOpen(false)} />}
        {/* Enhanced Sidebar */}
        <FocusTrap isActive={isSidebarOpen} onEscape={() => setIsSidebarOpen(false)}>
          <div ref={sidebarRef} className={cn('fixed top-0 left-0 bottom-0 z-50 w-full sm:w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-r border-gray-200/70 dark:border-gray-800/70 shadow-2xl transform transition-all duration-300 ease-out overflow-y-auto', isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 sm:opacity-100')} role="dialog" aria-modal="true" aria-label="Navigation">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/70 dark:border-gray-800/70 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/30">
              <Link to="/" className="flex items-center group" onClick={() => setIsSidebarOpen(false)}>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#3FE0A5] to-[#38B897] flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-[#3FE0A5]/30 group-hover:shadow-2xl group-hover:shadow-[#3FE0A5]/40 transition-all duration-300 group-hover:scale-105">
                  C
                </div>
                <h2 className="ml-3 text-xl font-bold bg-gradient-to-r from-[#3FE0A5] to-[#38B897] text-transparent bg-clip-text transition-all duration-300 group-hover:tracking-wide">
                  Creozel
                </h2>
              </Link>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95 group" aria-label="Close menu">
                <XIcon size={22} className="text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors duration-200" />
              </button>
            </div>
            {/* Sidebar Content */}
            <div className="p-6 sidebar-scroll overflow-y-auto max-h-[calc(100vh-6rem)]">
              {/* Quick Actions */}
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 font-bold px-2">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {quickActions.map(action => <Link key={action.title} to={action.href} className="flex items-center gap-3 px-5 py-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-gray-200/70 dark:border-gray-600/70 group" onClick={() => {
                  if (action.onClick) action.onClick();
                  setIsSidebarOpen(false);
                }}>
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r shadow-lg', action.color || 'from-[#3FE0A5] to-[#38B897]', 'text-white group-hover:scale-110 transition-transform duration-300')}>
                        {action.icon}
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#3FE0A5] transition-colors duration-200">
                        {action.title}
                      </span>
                    </Link>)}
                </div>
              </div>
              {/* Main Navigation */}
              <nav className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 font-bold px-2">
                  Main Navigation
                </h3>
                {navigationItems.map(item => <div key={item.href} className="mb-1">
                    {item.children ? <div>
                        <button onClick={() => toggleExpanded(item.title)} className={cn('flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200', isActive(item.href) ? 'text-white bg-gradient-to-r from-[#3FE0A5] to-[#38B897] shadow-xl shadow-[#3FE0A5]/30' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg')} aria-expanded={expandedItems.includes(item.title)}>
                          <div className="flex items-center gap-3">
                            <span>{item.icon}</span>
                            {item.title}
                          </div>
                          <ChevronRightIcon size={18} className={cn('transition-transform duration-300', expandedItems.includes(item.title) ? 'rotate-90' : '')} />
                        </button>
                        {expandedItems.includes(item.title) && <div className="mt-2 ml-10 pl-5 border-l-2 border-gray-200 dark:border-gray-700 space-y-1 animate-in fade-in slide-in-from-left-2 duration-300">
                            {item.children.map(child => <Link key={child.href} to={child.href} className={cn('flex items-start gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group', isActive(child.href) ? 'text-[#3FE0A5] bg-[#3FE0A5]/10 font-semibold shadow-md' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md')} onClick={() => setIsSidebarOpen(false)}>
                                <span className="opacity-80 group-hover:opacity-100 transition-opacity duration-200 mt-0.5">
                                  {child.icon}
                                </span>
                                <div className="flex-1">
                                  <div className="font-medium group-hover:text-[#3FE0A5] transition-colors duration-200">
                                    {child.title}
                                  </div>
                                  {child.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                                      {child.description}
                                    </p>}
                                </div>
                              </Link>)}
                          </div>}
                      </div> : <Link to={item.href} className={cn('flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200', isActive(item.href) ? 'text-white bg-gradient-to-r from-[#3FE0A5] to-[#38B897] shadow-xl shadow-[#3FE0A5]/30' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg')} onClick={() => setIsSidebarOpen(false)}>
                        <span>{item.icon}</span>
                        {item.title}
                      </Link>}
                  </div>)}
              </nav>
              {/* Settings and Help */}
              <div className="mt-8 pt-6 border-t border-gray-200/70 dark:border-gray-800/70">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 font-bold px-2">
                  Support
                </h3>
                <Link to="/settings" className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-lg mb-2" onClick={() => setIsSidebarOpen(false)}>
                  <SettingsIcon size={18} />
                  Settings
                </Link>
                <Link to="/help" className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-lg" onClick={() => setIsSidebarOpen(false)}>
                  <HelpCircleIcon size={18} />
                  Help & Support
                </Link>
              </div>
              {/* User Info */}
              <div className="mt-8 pt-6 border-t border-gray-200/70 dark:border-gray-800/70">
                <div className="flex items-center p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200/70 dark:border-gray-600/70 shadow-lg hover:shadow-xl transition-all duration-300">
                  <img src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'} alt={`${user?.name || 'User'} avatar`} className="w-14 h-14 rounded-xl object-cover border-2 border-white dark:border-gray-600 shadow-lg" />
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      @{user?.username || 'username'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FocusTrap>
      </>
    </>;
};