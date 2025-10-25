import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { UsersIcon, PlusIcon, FolderIcon, MessageSquareIcon, ClockIcon, EyeIcon, EditIcon, ShareIcon, MoreVerticalIcon, SearchIcon, FilterIcon, StarIcon, CheckCircleIcon, AlertCircleIcon, UserPlusIcon, SettingsIcon, TrendingUpIcon, FileTextIcon, ImageIcon, VideoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
interface Workspace {
  id: string;
  name: string;
  description: string;
  members: number;
  activeProjects: number;
  lastActivity: string;
  owner: {
    name: string;
    avatar: string;
  };
  status: 'active' | 'archived';
  isStarred: boolean;
}
interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'comment' | 'edit' | 'create' | 'share';
}
export const CollaborationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('workspaces');
  const [searchQuery, setSearchQuery] = useState('');
  const tabs = [{
    id: 'workspaces',
    label: 'Workspaces'
  }, {
    id: 'activity',
    label: 'Recent Activity'
  }, {
    id: 'shared',
    label: 'Shared with Me'
  }];
  const workspaces: Workspace[] = [{
    id: '1',
    name: 'Marketing Campaign Q1',
    description: 'Social media content for Q1 marketing initiatives',
    members: 8,
    activeProjects: 12,
    lastActivity: '2 hours ago',
    owner: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60'
    },
    status: 'active',
    isStarred: true
  }, {
    id: '2',
    name: 'Product Launch 2024',
    description: 'Content creation for new product launch',
    members: 5,
    activeProjects: 8,
    lastActivity: '5 hours ago',
    owner: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60'
    },
    status: 'active',
    isStarred: false
  }, {
    id: '3',
    name: 'Brand Redesign',
    description: 'Visual assets and brand guidelines',
    members: 6,
    activeProjects: 15,
    lastActivity: '1 day ago',
    owner: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60'
    },
    status: 'active',
    isStarred: true
  }];
  const recentActivity: Activity[] = [{
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60'
    },
    action: 'commented on',
    target: 'Instagram Post Draft',
    timestamp: '5 minutes ago',
    type: 'comment'
  }, {
    id: '2',
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60'
    },
    action: 'edited',
    target: 'Product Video Script',
    timestamp: '1 hour ago',
    type: 'edit'
  }, {
    id: '3',
    user: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60'
    },
    action: 'created',
    target: 'Brand Guidelines Document',
    timestamp: '3 hours ago',
    type: 'create'
  }, {
    id: '4',
    user: {
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60'
    },
    action: 'shared',
    target: 'Q1 Marketing Assets',
    timestamp: '5 hours ago',
    type: 'share'
  }];
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageSquareIcon size={16} className="text-blue-500" />;
      case 'edit':
        return <EditIcon size={16} className="text-amber-500" />;
      case 'create':
        return <PlusIcon size={16} className="text-green-500" />;
      case 'share':
        return <ShareIcon size={16} className="text-purple-500" />;
      default:
        return <ClockIcon size={16} className="text-gray-500" />;
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UsersIcon size={28} className="text-[#3FE0A5]" />
            Collaboration Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage team workspaces and collaborate on content
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<UserPlusIcon size={16} />}>
            Invite Members
          </Button>
          <Button variant="primary" leftIcon={<PlusIcon size={16} />}>
            New Workspace
          </Button>
        </div>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{
        label: 'Active Workspaces',
        value: '3',
        icon: <FolderIcon size={18} />,
        color: 'from-blue-500 to-cyan-600',
        change: '+2 this month'
      }, {
        label: 'Team Members',
        value: '24',
        icon: <UsersIcon size={18} />,
        color: 'from-purple-500 to-indigo-600',
        change: '+5 this month'
      }, {
        label: 'Active Projects',
        value: '35',
        icon: <TrendingUpIcon size={18} />,
        color: 'from-green-500 to-emerald-600',
        change: '+12 this week'
      }, {
        label: 'Comments Today',
        value: '48',
        icon: <MessageSquareIcon size={18} />,
        color: 'from-amber-500 to-orange-600',
        change: '+18 today'
      }].map((stat, index) => <Card key={index} className="relative overflow-hidden">
            <div className="p-5">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-3`}>
                {stat.icon}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <span className="text-xs text-green-500 font-medium">
                {stat.change}
              </span>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
          </Card>)}
      </div>
      {/* Main Content */}
      <Card>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#3FE0A5] focus:border-transparent" />
              </div>
              <Button variant="outline" size="sm" leftIcon={<FilterIcon size={14} />}>
                Filter
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6">
          {activeTab === 'workspaces' && <div className="space-y-4">
              {workspaces.map(workspace => <div key={workspace.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3FE0A5] to-[#38B897] flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {workspace.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Link to={`/collaboration/workspace/${workspace.id}`} className="text-lg font-semibold text-gray-900 dark:text-white hover:text-[#3FE0A5] transition-colors">
                            {workspace.name}
                          </Link>
                          {workspace.isStarred && <StarIcon size={16} className="text-amber-500 fill-amber-500" />}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {workspace.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <img src={workspace.owner.avatar} alt={workspace.owner.name} className="w-5 h-5 rounded-full" />
                            <span>{workspace.owner.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <UsersIcon size={14} />
                            <span>{workspace.members} members</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FolderIcon size={14} />
                            <span>{workspace.activeProjects} projects</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ClockIcon size={14} />
                            <span>{workspace.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVerticalIcon size={16} className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>}
          {activeTab === 'activity' && <div className="space-y-3">
              {recentActivity.map(activity => <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <img src={activity.user.avatar} alt={activity.user.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.user.name}</span>{' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        {activity.action}
                      </span>{' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>)}
            </div>}
          {activeTab === 'shared' && <div className="text-center py-12">
              <ShareIcon size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                Content shared with you will appear here
              </p>
            </div>}
        </div>
      </Card>
    </div>;
};