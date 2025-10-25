import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { TrendingUpIcon, TrendingDownIcon, EyeIcon, HeartIcon, MessageCircleIcon, ShareIcon, TargetIcon, ClockIcon, UsersIcon, BarChart2Icon, DownloadIcon, CalendarIcon, FilterIcon, ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface MetricCard {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}
interface ContentPerformance {
  id: string;
  title: string;
  type: 'video' | 'image' | 'text' | 'carousel';
  platform: string;
  views: number;
  engagement: number;
  shares: number;
  comments: number;
  publishedAt: string;
  thumbnail?: string;
}
export const PerformanceAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const tabs = [{
    id: 'overview',
    label: 'Overview'
  }, {
    id: 'content',
    label: 'Content Performance'
  }, {
    id: 'audience',
    label: 'Audience Behavior'
  }, {
    id: 'conversion',
    label: 'Conversions'
  }];
  const timeRanges = [{
    id: '7d',
    label: 'Last 7 days'
  }, {
    id: '30d',
    label: 'Last 30 days'
  }, {
    id: '90d',
    label: 'Last 90 days'
  }, {
    id: 'custom',
    label: 'Custom range'
  }];
  const metrics: MetricCard[] = [{
    label: 'Total Reach',
    value: '2.4M',
    change: 15.3,
    trend: 'up',
    icon: <EyeIcon size={20} />,
    color: 'from-blue-500 to-cyan-600'
  }, {
    label: 'Engagement Rate',
    value: '6.8%',
    change: 2.4,
    trend: 'up',
    icon: <HeartIcon size={20} />,
    color: 'from-pink-500 to-rose-600'
  }, {
    label: 'Avg. Watch Time',
    value: '3:42',
    change: -0.8,
    trend: 'down',
    icon: <ClockIcon size={20} />,
    color: 'from-amber-500 to-orange-600'
  }, {
    label: 'Conversion Rate',
    value: '4.2%',
    change: 0.0,
    trend: 'neutral',
    icon: <TargetIcon size={20} />,
    color: 'from-green-500 to-emerald-600'
  }, {
    label: 'New Followers',
    value: '12.5K',
    change: 18.7,
    trend: 'up',
    icon: <UsersIcon size={20} />,
    color: 'from-purple-500 to-indigo-600'
  }, {
    label: 'Total Shares',
    value: '48.2K',
    change: 12.1,
    trend: 'up',
    icon: <ShareIcon size={20} />,
    color: 'from-teal-500 to-cyan-600'
  }];
  const topContent: ContentPerformance[] = [{
    id: '1',
    title: '10 AI Tools That Will Change Your Life',
    type: 'video',
    platform: 'Instagram',
    views: 245000,
    engagement: 8.3,
    shares: 12400,
    comments: 3200,
    publishedAt: '2 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&auto=format&fit=crop&q=60'
  }, {
    id: '2',
    title: 'The Future of Content Creation',
    type: 'carousel',
    platform: 'LinkedIn',
    views: 128000,
    engagement: 6.7,
    shares: 5600,
    comments: 890,
    publishedAt: '4 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&auto=format&fit=crop&q=60'
  }, {
    id: '3',
    title: 'How to Build a Personal Brand in 2024',
    type: 'text',
    platform: 'Twitter',
    views: 89000,
    engagement: 5.2,
    shares: 4200,
    comments: 1100,
    publishedAt: '1 week ago'
  }, {
    id: '4',
    title: 'Social Media Strategy Guide',
    type: 'image',
    platform: 'Facebook',
    views: 67000,
    engagement: 4.8,
    shares: 2800,
    comments: 670,
    publishedAt: '1 week ago',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&auto=format&fit=crop&q=60'
  }];
  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <ArrowUpIcon size={16} className="text-green-500" />;
      case 'down':
        return <ArrowDownIcon size={16} className="text-red-500" />;
      case 'neutral':
        return <MinusIcon size={16} className="text-gray-500" />;
    }
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'image':
        return '🖼️';
      case 'text':
        return '📝';
      case 'carousel':
        return '🎠';
      default:
        return '📄';
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Performance Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Track and analyze your content performance across all platforms
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<FilterIcon size={16} />}>
            Filters
          </Button>
          <Button variant="outline" leftIcon={<DownloadIcon size={16} />}>
            Export Report
          </Button>
        </div>
      </div>
      {/* Time Range Selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon size={18} className="text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Time Range:
            </span>
          </div>
          <div className="flex items-center gap-2">
            {timeRanges.map(range => <button key={range.id} onClick={() => setTimeRange(range.id)} className={cn('px-3 py-1.5 rounded-lg text-sm font-medium transition-all', timeRange === range.id ? 'bg-[#3FE0A5] text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700')}>
                {range.label}
              </button>)}
          </div>
        </div>
      </Card>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-200">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center text-white shadow-lg`}>
                  {metric.icon}
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className={cn('text-sm font-medium', metric.trend === 'up' && 'text-green-500', metric.trend === 'down' && 'text-red-500', metric.trend === 'neutral' && 'text-gray-500')}>
                    {metric.change > 0 ? '+' : ''}
                    {metric.change}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {metric.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </p>
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${metric.color}`} />
          </Card>)}
      </div>
      {/* Main Content */}
      <Card>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="enclosed" />
        <div className="p-6">
          {activeTab === 'overview' && <div className="space-y-6">
              {/* Performance Chart */}
              <div className="h-80 bg-gray-50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart2Icon size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Performance chart visualization would go here
                  </p>
                </div>
              </div>
              {/* Platform Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Platform Performance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[{
                name: 'Instagram',
                reach: '1.2M',
                engagement: '7.2%',
                color: 'from-pink-500 to-rose-600'
              }, {
                name: 'LinkedIn',
                reach: '680K',
                engagement: '5.8%',
                color: 'from-blue-500 to-indigo-600'
              }, {
                name: 'Twitter',
                reach: '420K',
                engagement: '4.3%',
                color: 'from-sky-500 to-blue-600'
              }, {
                name: 'Facebook',
                reach: '340K',
                engagement: '3.9%',
                color: 'from-blue-600 to-indigo-700'
              }].map((platform, index) => <div key={index} className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center text-white font-bold text-sm mb-3`}>
                        {platform.name[0]}
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {platform.name}
                      </h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Reach
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {platform.reach}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Engagement
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {platform.engagement}
                          </span>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}
          {activeTab === 'content' && <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Top Performing Content
                </h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {topContent.map(content => <div key={content.id} className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-4">
                      {content.thumbnail ? <img src={content.thumbnail} alt={content.title} className="w-24 h-24 rounded-lg object-cover" /> : <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-4xl">
                          {getTypeIcon(content.type)}
                        </div>}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {content.title}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {content.publishedAt}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <span>{content.platform}</span>
                          <span>•</span>
                          <span className="capitalize">{content.type}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                          <div className="flex items-center gap-2">
                            <EyeIcon size={14} className="text-blue-500" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Views
                              </p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {(content.views / 1000).toFixed(1)}K
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <HeartIcon size={14} className="text-pink-500" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Engagement
                              </p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {content.engagement}%
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ShareIcon size={14} className="text-green-500" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Shares
                              </p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {(content.shares / 1000).toFixed(1)}K
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircleIcon size={14} className="text-amber-500" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Comments
                              </p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {(content.comments / 1000).toFixed(1)}K
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}
          {activeTab === 'audience' && <div className="text-center py-12">
              <UsersIcon size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                Audience behavior analytics coming soon
              </p>
            </div>}
          {activeTab === 'conversion' && <div className="text-center py-12">
              <TargetIcon size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                Conversion tracking coming soon
              </p>
            </div>}
        </div>
      </Card>
    </div>;
};