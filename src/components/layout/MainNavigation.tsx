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
  // Get state and functions from context
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
    title: 'Content',
    href: '/content',
    children: [{
      icon: <FileTextIcon size={18} />,
      title: 'Text Editor',
      href: '/content/text',
      description: 'Create and edit text-based content'
    }, {
      icon: <ImageIcon size={18} />,
      title: 'Image Editor',
      href: '/content/image',
      description: 'Edit and optimize images'
    }, {
      icon: <VideoIcon size={18} />,
      title: 'Video Editor',
      href: '/content/video',
      description: 'Create engaging video content'
    }, {
      icon: <MicIcon size={18} />,
      title: 'Audio Editor',
      href: '/content/audio',
      description: 'Record and edit audio content'
    }]
  }, {
    icon: <RocketIcon size={18} />,
    title: 'Autopilot',
    href: '/autopilot',
    children: [{
      icon: <SparklesIcon size={18} />,
      title: 'Dashboard',
      href: '/autopilot',
      description: 'Overview of your content automation'
    }, {
      icon: <PenToolIcon size={18} />,
      title: 'Create Pipeline',
      href: '/autopilot/create',
      description: 'Set up new content automation'
    }, {
      icon: <VideoIcon size={18} />,
      title: 'Video Generator',
      href: '/autopilot/video-generator',
      description: 'Automatically generate videos'
    }, {
      icon: <FileTextIcon size={18} />,
      title: 'Custom Templates',
      href: '/autopilot/templates',
      description: 'Manage your content templates'
    }, {
      icon: <CalendarIcon size={18} />,
      title: 'Post Scheduler',
      href: '/autopilot/scheduler',
      description: 'Schedule your content posts'
    }, {
      icon: <FolderIcon size={18} />,
      title: 'Media Library',
      href: '/autopilot/media',
      description: 'Manage your media assets'
    }, {
      icon: <BarChart2Icon size={18} />,
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
    icon: <PenToolIcon size={16} />,
    title: 'New Content',
    href: '/content',
    color: 'from-blue-400 to-indigo-500'
  }, {
    icon: <RocketIcon size={16} />,
    title: 'New Pipeline',
    href: '/autopilot/create',
    color: 'from-purple-400 to-pink-500'
  }, {
    icon: <DollarSignIcon size={16} />,
    title: 'Affiliate',
    href: '/affiliate',
    color: 'from-amber-400 to-orange-500'
  }];
  return <>
      {/* Enhanced Header with improved visual design */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        <div className="glass-effect mx-4 mt-4 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/30 backdrop-blur-lg">
          <div className="px-4 py-2.5 flex items-center justify-between">
            {/* Logo and Menu Toggle */}
            <div className="flex items-center">
              {/* Menu Toggle Button with improved interaction */}
              <button className="mr-3 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-200 active:scale-95" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-expanded={isSidebarOpen} aria-label="Toggle menu">
                <MenuIcon size={20} className="text-gray-700 dark:text-gray-300" />
              </button>
              {/* Enhanced Logo with animation */}
              <Link to="/" className="flex items-center group">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3FE0A5] to-[#38B897] flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-[#3FE0A5]/20 transition-all duration-300 group-hover:scale-105">
                  C
                </div>
                <h1 className="ml-2.5 text-xl font-semibold bg-gradient-to-r from-[#3FE0A5] to-[#38B897] text-transparent bg-clip-text transition-all duration-300 group-hover:tracking-wide">
                  Creozel
                </h1>
              </Link>
            </div>
            {/* Right Side - User Controls with improved spacing and interactions */}
            <div className="flex items-center space-x-3">
              {/* Credits */}
              <div className="relative">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100/80 dark:bg-gray-800/80 rounded-md hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 active:scale-95 shadow-sm" onClick={toggleCreditsMenu} aria-expanded={showCreditsMenu} data-menu-toggle="credits">
                  <span className="text-sm font-medium text-[#3FE0A5]">
                    Credits:
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.credits || 0}
                  </span>
                </button>
                <CreditsMenu />
              </div>
              {/* Notifications with improved visual indicator */}
              <div className="relative">
                <button className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-200 active:scale-95" onClick={toggleNotifications} aria-expanded={showNotifications} aria-label="Notifications" data-menu-toggle="notifications">
                  <BellIcon size={20} className="text-gray-700 dark:text-gray-300" />
                  <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse"></span>
                </button>
                <NotificationsMenu />
              </div>
              {/* Messages with improved visual indicator */}
              <div className="relative">
                <button className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-200 active:scale-95" onClick={toggleMailbox} aria-expanded={showMailbox} aria-label="Messages" data-menu-toggle="mailbox">
                  <MailIcon size={20} className="text-gray-700 dark:text-gray-300" />
                  <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse"></span>
                </button>
                <MailboxMenu />
              </div>
              {/* Theme Toggle with improved animation */}
              <button onClick={toggleDarkMode} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-300 active:scale-95 overflow-hidden" aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                {isDarkMode ? <SunIcon size={20} className="text-yellow-400 animate-in fade-in duration-300" /> : <MoonIcon size={20} className="text-gray-700 animate-in fade-in duration-300" />}
              </button>
              {/* User Profile with improved visual feedback */}
              <div className="relative">
                <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 dark:border-gray-700/50 hover:ring-2 hover:ring-[#3FE0A5]/30 transition-all duration-300 active:scale-95" onClick={toggleProfileMenu} aria-expanded={showProfileMenu} aria-label="User menu" data-menu-toggle="profile">
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
        {/* Enhanced Backdrop with smoother transition */}
        {isSidebarOpen && <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200" aria-hidden="true" onClick={() => setIsSidebarOpen(false)} />}
        {/* Enhanced Sidebar with improved animations and visual hierarchy */}
        <FocusTrap isActive={isSidebarOpen} onEscape={() => setIsSidebarOpen(false)}>
          <div ref={sidebarRef} className={cn('fixed top-0 left-0 bottom-0 z-50 w-full sm:w-80 glass-effect border-r border-white/20 dark:border-gray-700/30 shadow-xl transform transition-all duration-300 ease-out overflow-y-auto', isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 sm:opacity-100')} role="dialog" aria-modal="true" aria-label="Navigation">
            {/* Sidebar Header with improved visual design */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/10 dark:border-gray-700/30">
              <Link to="/" className="flex items-center group" onClick={() => setIsSidebarOpen(false)}>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3FE0A5] to-[#38B897] flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-[#3FE0A5]/20 transition-all duration-300 group-hover:scale-105">
                  C
                </div>
                <h2 className="ml-2.5 text-xl font-semibold bg-gradient-to-r from-[#3FE0A5] to-[#38B897] text-transparent bg-clip-text transition-all duration-300 group-hover:tracking-wide">
                  Creozel
                </h2>
              </Link>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-200/20 dark:hover:bg-gray-800/20 transition-all duration-200 active:scale-95" aria-label="Close menu">
                <XIcon size={20} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            {/* Sidebar Content with improved spacing and visual hierarchy */}
            <div className="p-4 sidebar-scroll overflow-y-auto max-h-[calc(100vh-4rem)]">
              {/* Quick Actions with improved visual design */}
              <div className="mb-7">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-medium pl-1">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  {quickActions.map(action => <Link key={action.title} to={action.href} className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white/10 dark:bg-gray-800/30 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-200 hover:shadow-md active:scale-95" onClick={() => {
                  if (action.onClick) action.onClick();
                  setIsSidebarOpen(false);
                }}>
                      <div className={cn('w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-r', action.color || 'from-[#3FE0A5] to-[#38B897]', 'text-white shadow-sm')}>
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {action.title}
                      </span>
                    </Link>)}
                </div>
              </div>
              {/* Main Navigation with improved visual hierarchy and animations */}
              <nav className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-medium pl-1">
                  Main Navigation
                </h3>
                {navigationItems.map(item => <div key={item.href} className="mb-1.5">
                    {item.children ? <div>
                        <button onClick={() => toggleExpanded(item.title)} className={cn('flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200', isActive(item.href) ? 'text-[#3FE0A5] bg-[#3FE0A5]/10 shadow-sm' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:shadow-sm')} aria-expanded={expandedItems.includes(item.title)}>
                          <div className="flex items-center">
                            <span className="mr-3 opacity-80">{item.icon}</span>
                            {item.title}
                          </div>
                          <ChevronRightIcon size={16} className={cn('transition-transform duration-300', expandedItems.includes(item.title) ? 'rotate-90' : '')} />
                        </button>
                        {/* Dropdown Items with improved animation and visual design */}
                        {expandedItems.includes(item.title) && <div className="mt-1.5 ml-6 pl-4 border-l border-gray-200/20 dark:border-gray-700/30 space-y-1.5 animate-in fade-in slide-in-from-left-1 duration-200">
                            {item.children.map(child => <Link key={child.href} to={child.href} className={cn('flex items-center px-3.5 py-2.5 rounded-lg text-sm transition-all duration-200', isActive(child.href) ? 'text-[#3FE0A5] bg-[#3FE0A5]/10 shadow-sm' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:shadow-sm')} onClick={() => setIsSidebarOpen(false)}>
                                <span className="mr-2.5 opacity-80">
                                  {child.icon}
                                </span>
                                <div>
                                  <div>{child.title}</div>
                                  {child.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 max-w-[200px]">
                                      {child.description}
                                    </p>}
                                </div>
                              </Link>)}
                          </div>}
                      </div> : <Link to={item.href} className={cn('flex items-center px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200', isActive(item.href) ? 'text-[#3FE0A5] bg-[#3FE0A5]/10 shadow-sm' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:shadow-sm')} onClick={() => setIsSidebarOpen(false)}>
                        <span className="mr-3 opacity-80">{item.icon}</span>
                        {item.title}
                      </Link>}
                  </div>)}
              </nav>
              {/* Settings and Help with improved visual separation */}
              <div className="mt-7 pt-6 border-t border-gray-200/10 dark:border-gray-700/30">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-medium pl-1">
                  Support
                </h3>
                <Link to="/settings" className="flex items-center px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:shadow-sm mb-1.5" onClick={() => setIsSidebarOpen(false)}>
                  <SettingsIcon size={18} className="mr-3 opacity-80" />
                  Settings
                </Link>
                <Link to="/help" className="flex items-center px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:shadow-sm" onClick={() => setIsSidebarOpen(false)}>
                  <HelpCircleIcon size={18} className="mr-3 opacity-80" />
                  Help & Support
                </Link>
              </div>
              {/* User Info with improved visual design */}
              <div className="mt-7 pt-6 border-t border-gray-200/10 dark:border-gray-700/30">
                <div className="flex items-center p-3.5 bg-white/10 dark:bg-gray-800/30 rounded-lg">
                  <img src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'} alt={`${user?.name || 'User'} avatar`} className="w-11 h-11 rounded-full object-cover border-2 border-white/20 dark:border-gray-700/50 shadow-md" />
                  <div className="ml-3.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
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