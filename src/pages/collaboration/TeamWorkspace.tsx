import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { ArrowLeftIcon, UsersIcon, SettingsIcon, PlusIcon, FileTextIcon, ImageIcon, VideoIcon, FolderIcon, MessageSquareIcon, ClockIcon, MoreVerticalIcon, EyeIcon, EditIcon, TrashIcon, ShareIcon, DownloadIcon, StarIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '../../lib/utils';
interface Project {
  id: string;
  name: string;
  type: 'text' | 'image' | 'video' | 'folder';
  status: 'draft' | 'in-review' | 'approved' | 'published';
  lastModified: string;
  modifiedBy: {
    name: string;
    avatar: string;
  };
  comments: number;
  isStarred: boolean;
}
interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  status: 'online' | 'offline' | 'away';
  lastActive: string;
}
export const TeamWorkspace: React.FC = () => {
  const {
    id
  } = useParams();
  const [activeTab, setActiveTab] = useState('projects');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const tabs = [{
    id: 'projects',
    label: 'Projects'
  }, {
    id: 'members',
    label: 'Team Members'
  }, {
    id: 'activity',
    label: 'Activity'
  }, {
    id: 'settings',
    label: 'Settings'
  }];
  const projects: Project[] = [{
    id: '1',
    name: 'Instagram Campaign Post',
    type: 'image',
    status: 'in-review',
    lastModified: '2 hours ago',
    modifiedBy: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60'
    },
    comments: 5,
    isStarred: true
  }, {
    id: '2',
    name: 'Product Launch Video',
    type: 'video',
    status: 'draft',
    lastModified: '5 hours ago',
    modifiedBy: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60'
    },
    comments: 12,
    isStarred: false
  }, {
    id: '3',
    name: 'Blog Post Draft',
    type: 'text',
    status: 'approved',
    lastModified: '1 day ago',
    modifiedBy: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60'
    },
    comments: 3,
    isStarred: true
  }];
  const teamMembers: TeamMember[] = [{
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60',
    role: 'owner',
    status: 'online',
    lastActive: 'Now'
  }, {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60',
    role: 'admin',
    status: 'online',
    lastActive: '5 min ago'
  }, {
    id: '3',
    name: 'Emily Davis',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60',
    role: 'editor',
    status: 'away',
    lastActive: '1 hour ago'
  }, {
    id: '4',
    name: 'David Park',
    email: 'david@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60',
    role: 'viewer',
    status: 'offline',
    lastActive: '2 days ago'
  }];
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileTextIcon size={20} className="text-blue-500" />;
      case 'image':
        return <ImageIcon size={20} className="text-purple-500" />;
      case 'video':
        return <VideoIcon size={20} className="text-rose-500" />;
      case 'folder':
        return <FolderIcon size={20} className="text-amber-500" />;
      default:
        return <FileTextIcon size={20} className="text-gray-500" />;
    }
  };
  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
      'in-review': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      published: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    };
    return <span className={cn('px-2 py-1 rounded-full text-xs font-medium', styles[status as keyof typeof styles])}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>;
  };
  const getRoleBadge = (role: string) => {
    const styles = {
      owner: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      admin: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      editor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      viewer: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    };
    return <span className={cn('px-2 py-1 rounded-full text-xs font-medium', styles[role as keyof typeof styles])}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>;
  };
  const getStatusIndicator = (status: string) => {
    const styles = {
      online: 'bg-green-500',
      away: 'bg-amber-500',
      offline: 'bg-gray-400'
    };
    return <div className={cn('w-2.5 h-2.5 rounded-full', styles[status as keyof typeof styles])} />;
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/collaboration">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeftIcon size={14} />}>
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Marketing Campaign Q1
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Social media content for Q1 marketing initiatives
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<ShareIcon size={16} />}>
            Share
          </Button>
          <Button variant="outline" leftIcon={<SettingsIcon size={16} />}>
            Settings
          </Button>
          <Button variant="primary" leftIcon={<PlusIcon size={16} />}>
            New Project
          </Button>
        </div>
      </div>
      {/* Main Content */}
      <Card>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="enclosed" />
        <div className="p-6">
          {activeTab === 'projects' && <div className="space-y-4">
              {/* View Mode Toggle */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  All Projects ({projects.length})
                </h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => setViewMode('grid')} className={cn('px-3 py-1.5 rounded-lg text-sm font-medium transition-colors', viewMode === 'grid' ? 'bg-[#3FE0A5] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400')}>
                    Grid
                  </button>
                  <button onClick={() => setViewMode('list')} className={cn('px-3 py-1.5 rounded-lg text-sm font-medium transition-colors', viewMode === 'list' ? 'bg-[#3FE0A5] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400')}>
                    List
                  </button>
                </div>
              </div>
              {/* Projects Grid/List */}
              <div className={cn(viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3')}>
                {projects.map(project => <div key={project.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          {getTypeIcon(project.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {project.name}
                          </h4>
                          {getStatusBadge(project.status)}
                        </div>
                      </div>
                      {project.isStarred && <StarIcon size={16} className="text-amber-500 fill-amber-500 flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1.5">
                        <img src={project.modifiedBy.avatar} alt={project.modifiedBy.name} className="w-5 h-5 rounded-full" />
                        <span className="truncate">
                          {project.modifiedBy.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquareIcon size={14} />
                        <span>{project.comments}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{project.lastModified}</span>
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                        <MoreVerticalIcon size={14} />
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>}
          {activeTab === 'members' && <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Team Members ({teamMembers.length})
                </h3>
                <Button variant="primary" size="sm" leftIcon={<PlusIcon size={14} />}>
                  Add Member
                </Button>
              </div>
              <div className="space-y-3">
                {teamMembers.map(member => <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
                        <div className="absolute bottom-0 right-0">
                          {getStatusIndicator(member.status)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {member.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Last active: {member.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getRoleBadge(member.role)}
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVerticalIcon size={16} className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>}
          {activeTab === 'activity' && <div className="text-center py-12">
              <ClockIcon size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                Activity feed coming soon
              </p>
            </div>}
          {activeTab === 'settings' && <div className="text-center py-12">
              <SettingsIcon size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                Workspace settings coming soon
              </p>
            </div>}
        </div>
      </Card>
    </div>;
};