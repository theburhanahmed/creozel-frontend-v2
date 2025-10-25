import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { BellIcon, CheckIcon, TrashIcon, FilterIcon, XIcon, BellOffIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';
type NotificationType = 'all' | 'unread' | 'mentions' | 'system';
type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'mention' | 'system' | 'content';
  read: boolean;
};
export const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState<NotificationType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([{
    id: 1,
    title: 'New follower',
    message: 'Alex Johnson started following your account',
    time: '2 hours ago',
    type: 'system',
    read: false
  }, {
    id: 2,
    title: 'Content published',
    message: 'Your video "10 Productivity Tips" is now live',
    time: '5 hours ago',
    type: 'content',
    read: false
  }, {
    id: 3,
    title: 'You were mentioned',
    message: '@sarah_designer mentioned you in a comment: "Great work on this design, @user!"',
    time: '1 day ago',
    type: 'mention',
    read: false
  }, {
    id: 4,
    title: 'System update',
    message: "We've updated our terms of service. Please review them at your convenience.",
    time: '3 days ago',
    type: 'system',
    read: true
  }, {
    id: 5,
    title: 'Content milestone',
    message: 'Congratulations! Your latest post has reached 1,000 views.',
    time: '5 days ago',
    type: 'content',
    read: true
  }]);
  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    if (activeFilter === 'mentions') return notification.type === 'mention';
    if (activeFilter === 'system') return notification.type === 'system';
    return true;
  });
  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification => notification.id === id ? {
      ...notification,
      read: true
    } : notification));
    toast.success('Notification marked as read');
  };
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
    toast.success('All notifications marked as read');
  };
  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast.success('Notification deleted');
  };
  const handleClearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mention':
        return <span className="text-blue-500 dark:text-blue-400">@</span>;
      case 'system':
        return <BellIcon size={14} className="text-purple-500 dark:text-purple-400" />;
      case 'content':
        return <CheckIcon size={14} className="text-green-500 dark:text-green-400" />;
      default:
        return <BellIcon size={14} />;
    }
  };
  return <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stay updated with your latest activities and mentions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<CheckIcon size={16} />} onClick={handleMarkAllAsRead} disabled={notifications.every(n => n.read)}>
            Mark All as Read
          </Button>
          <Button variant="outline" leftIcon={<TrashIcon size={16} />} onClick={handleClearAll} disabled={notifications.length === 0}>
            Clear All
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        <button onClick={() => setActiveFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'all' ? 'bg-[#3FE0A5]/10 text-[#3FE0A5]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
          All
        </button>
        <button onClick={() => setActiveFilter('unread')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'unread' ? 'bg-[#3FE0A5]/10 text-[#3FE0A5]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
          Unread
        </button>
        <button onClick={() => setActiveFilter('mentions')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'mentions' ? 'bg-[#3FE0A5]/10 text-[#3FE0A5]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
          Mentions
        </button>
        <button onClick={() => setActiveFilter('system')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'system' ? 'bg-[#3FE0A5]/10 text-[#3FE0A5]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
          System
        </button>
      </div>
      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? filteredNotifications.map(notification => <Card key={notification.id} className={`p-4 transition-all ${!notification.read ? 'border-l-4 border-l-[#3FE0A5]' : ''}`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notification.read ? 'bg-gray-100 dark:bg-gray-800' : 'bg-[#3FE0A5]/10'}`}>
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {notification.message}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && <button onClick={() => handleMarkAsRead(notification.id)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Mark as read">
                      <CheckIcon size={16} className="text-gray-500 dark:text-gray-400" />
                    </button>}
                  <button onClick={() => handleDeleteNotification(notification.id)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Delete notification">
                    <XIcon size={16} className="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </Card>) : <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <BellOffIcon size={24} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No notifications found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {activeFilter !== 'all' ? `You don't have any ${activeFilter} notifications at the moment.` : "You don't have any notifications at the moment. We'll notify you when something important happens."}
            </p>
          </div>}
      </div>
    </div>;
};