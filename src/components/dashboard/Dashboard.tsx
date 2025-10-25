import React, { useEffect, useState, Component } from 'react';
import { Card } from '../ui/Card';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Grid, GridItem } from '../ui/Grid';
import { BarChart2Icon, ArrowRightIcon, PlusIcon, BellIcon, SparklesIcon, InfoIcon, TrendingUpIcon, ArrowUpIcon, ArrowDownIcon, ClockIcon, ZapIcon, UsersIcon, EyeIcon, HeartIcon, ShareIcon, CalendarIcon, MessageCircleIcon, TargetIcon, BarChartIcon, LineChartIcon, PieChartIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { ContentCreationPanel } from './ContentCreationPanel';
import { UpcomingPosts } from './UpcomingPosts';
import { AffiliateStatsWidget } from './AffiliateStatsWidget';
import { AnalyticsChart } from './AnalyticsChart';
import { Link } from 'react-router-dom';
import { LoadingState } from '../ui/LoadingState';
import { TourGuide } from '../ui/TourGuide';
import { DataDisplay } from '../ui/DataDisplay';
import { useAppContext } from '../../context/AppContext';
export const Dashboard = () => {
  const [showAIModal, setShowAIModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const {
    user
  } = useAppContext();
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  // Check if it's a first-time user
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('dashboard_tour_completed');
    if (!hasSeenTour) {
      // Wait for content to load before showing tour
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);
  const handleCreateContent = () => {
    setShowAIModal(true);
  };
  const completeTour = () => {
    localStorage.setItem('dashboard_tour_completed', 'true');
    setShowTour(false);
  };
  const tourSteps = [{
    target: '.welcome-banner',
    title: 'Personalized Dashboard',
    content: 'Welcome to your personalized dashboard with AI-powered recommendations.',
    position: 'bottom'
  }, {
    target: '.quick-actions',
    title: 'Quick Actions',
    content: 'Access your most common tasks quickly from this floating panel.',
    position: 'left'
  }, {
    target: '.stats-overview',
    title: 'Performance Overview',
    content: 'Track your content performance with these key metrics. Click to see detailed analytics.',
    position: 'bottom'
  }, {
    target: '.analytics-chart',
    title: 'Analytics Dashboard',
    content: 'View your performance trends over time with this interactive chart.',
    position: 'top'
  }, {
    target: '.content-creation-panel',
    title: 'Create Content',
    content: 'Start creating content with our AI-powered tools. Choose from different content types.',
    position: 'right'
  }, {
    target: '.upcoming-posts',
    title: 'Scheduled Content',
    content: 'See your upcoming scheduled posts and manage your content calendar.',
    position: 'left'
  }];
  const quickActions = [{
    icon: <PlusIcon size={16} />,
    label: 'Create Content',
    action: handleCreateContent
  }, {
    icon: <SparklesIcon size={16} />,
    label: 'AI Assistant',
    action: handleCreateContent
  }, {
    icon: <CalendarIcon size={16} />,
    label: 'Schedule Post',
    action: () => {},
    href: '/calendar'
  }, {
    icon: <BarChart2Icon size={16} />,
    label: 'Analytics',
    action: () => {},
    href: '/analytics'
  }];
  return <div className="w-full space-y-6">
      {/* Welcome Banner with AI Recommendations */}
      <GlassCard className="welcome-banner relative overflow-hidden bg-gradient-to-r from-gray-900/70 to-gray-800/70 border-none p-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3FE0A5]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#3FE0A5] to-[#38B897] flex items-center justify-center">
                <SparklesIcon size={20} className="text-white" />
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-3 py-1 text-xs font-medium text-white">
                <span className="animate-pulse mr-1.5 w-2 h-2 rounded-full bg-[#3FE0A5]"></span>
                AI-Powered Recommendations
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {user?.name || 'Content Creator'}
            </h1>
            <p className="text-gray-300">
              Based on your recent activity, we recommend focusing on video
              content for Instagram. Your audience engagement has increased by
              15% with this type of content.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button variant="primary" leftIcon={<PlusIcon size={16} />} onClick={handleCreateContent} ariaLabel="Create new content">
                Create Content
              </Button>
              <Button variant="outline" leftIcon={<InfoIcon size={16} />} ariaLabel="View dashboard help" onClick={() => setShowTour(true)} className="border-gray-600 hover:bg-gray-700 text-gray-300">
                Dashboard Guide
              </Button>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#3FE0A5]/20 to-[#38B897]/20 animate-pulse-slow"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#3FE0A5]/30 to-[#38B897]/30 animate-pulse-slow animation-delay-200"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#3FE0A5] to-[#38B897] flex items-center justify-center text-white">
                  <SparklesIcon size={24} className="text-white" />
                </div>
              </div>
              {/* Orbiting elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 animate-float">
                <div className="w-10 h-10 rounded-lg bg-indigo-600/80 flex items-center justify-center">
                  <VideoIcon size={18} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 animate-float animation-delay-500">
                <div className="w-10 h-10 rounded-lg bg-pink-600/80 flex items-center justify-center">
                  <ImageIcon size={18} className="text-white" />
                </div>
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-x-1/3 -translate-y-1/2 animate-float animation-delay-700">
                <div className="w-10 h-10 rounded-lg bg-amber-500/80 flex items-center justify-center">
                  <FileTextIcon size={18} className="text-white" />
                </div>
              </div>
              <div className="absolute right-0 top-1/2 transform translate-x-1/3 -translate-y-1/2 animate-float animation-delay-300">
                <div className="w-10 h-10 rounded-lg bg-blue-500/80 flex items-center justify-center">
                  <MicIcon size={18} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
      {/* Quick Actions Floating Panel */}
      <div className="quick-actions fixed bottom-6 right-6 z-30 md:bottom-auto md:right-auto md:top-32 md:left-6">
        
      </div>
      {/* Main Content - Asymmetric Grid Layout */}
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="stats-overview grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? <>
              <LoadingState variant="skeleton" height="h-24" />
              <LoadingState variant="skeleton" height="h-24" />
              <LoadingState variant="skeleton" height="h-24" />
              <LoadingState variant="skeleton" height="h-24" />
            </> : <>
              <DataCard title="Total Views" value="248.5K" change="+12.5%" isPositive={true} icon={<EyeIcon size={18} className="text-blue-400" />} chart={<MiniLineChart data={[15, 25, 20, 30, 25, 35, 40]} color="#60A5FA" />} />
              <DataCard title="Engagement Rate" value="5.2%" change="+0.8%" isPositive={true} icon={<HeartIcon size={18} className="text-pink-400" />} chart={<MiniLineChart data={[5, 7, 4, 6, 5, 8, 7]} color="#F472B6" />} />
              <DataCard title="Conversion Rate" value="3.1%" change="-0.2%" isPositive={false} icon={<TargetIcon size={18} className="text-amber-400" />} chart={<MiniLineChart data={[3, 4, 3.5, 2.8, 3.2, 3, 2.9]} color="#FBBF24" />} />
              <DataCard title="Avg. Watch Time" value="2:45" change="+0:15" isPositive={true} icon={<ClockIcon size={18} className="text-green-400" />} chart={<MiniLineChart data={[2, 2.2, 2.4, 2.3, 2.5, 2.7, 2.8]} color="#34D399" />} />
            </>}
        </div>
        {/* Main Grid Layout */}
        <Grid className="gap-6">
          {/* Left column - 2/3 width */}
          <GridItem colSpan={{
          lg: 2
        }} className="space-y-6">
            {/* Analytics Chart Card */}
            <Card className="overflow-hidden analytics-chart">
              <div className="p-5 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg text-white flex items-center gap-2">
                    <BarChart2Icon size={18} className="text-[#3FE0A5]" />
                    Performance Overview
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-full text-gray-400 text-xs hover:text-white focus:outline-none focus:ring-1 focus:ring-[#3FE0A5] focus:ring-offset-1 dark:focus:ring-offset-gray-800">
                      1 year
                    </button>
                    <button className="px-3 py-1 rounded-full bg-[#2A3245] text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#3FE0A5] focus:ring-offset-1 dark:focus:ring-offset-gray-800">
                      6 month
                    </button>
                    <button className="px-3 py-1 rounded-full text-gray-400 text-xs hover:text-white focus:outline-none focus:ring-1 focus:ring-[#3FE0A5] focus:ring-offset-1 dark:focus:ring-offset-gray-800">
                      30 days
                    </button>
                    <button className="px-3 py-1 rounded-full text-gray-400 text-xs hover:text-white focus:outline-none focus:ring-1 focus:ring-[#3FE0A5] focus:ring-offset-1 dark:focus:ring-offset-gray-800">
                      7 days
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                {isLoading ? <LoadingState variant="skeleton" height="h-64" /> : <div className="h-64">
                    <AnalyticsChart />
                  </div>}
              </div>
            </Card>
            {/* Content Creation and Upcoming Posts - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="content-creation-panel">
                {isLoading ? <LoadingState variant="skeleton" height="h-64" /> : <ContentCreationPanel onCreateContent={handleCreateContent} />}
              </div>
              <div className="upcoming-posts">
                {isLoading ? <LoadingState variant="skeleton" height="h-64" /> : <UpcomingPosts />}
              </div>
            </div>
            {/* Content Performance Card */}
            <Card className="overflow-hidden">
              <div className="p-5 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg text-white flex items-center gap-2">
                    <BarChartIcon size={18} className="text-indigo-400" />
                    Content Performance
                  </h3>
                  <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                    View All
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-gray-700">
                {isLoading ? <>
                    <LoadingState variant="skeleton" height="h-20" />
                    <LoadingState variant="skeleton" height="h-20" />
                    <LoadingState variant="skeleton" height="h-20" />
                  </> : [{
                title: '10 Productivity Hacks',
                type: 'Video',
                platform: 'Instagram',
                views: '45.2K',
                engagement: '8.3%',
                isPositive: true
              }, {
                title: 'Social Media Strategy 2023',
                type: 'Carousel',
                platform: 'LinkedIn',
                views: '12.8K',
                engagement: '5.7%',
                isPositive: true
              }, {
                title: 'AI Tools Comparison',
                type: 'Article',
                platform: 'Twitter',
                views: '8.4K',
                engagement: '2.1%',
                isPositive: false
              }].map((item, index) => <div key={index} className="p-4 hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type === 'Video' ? 'bg-pink-500/20 text-pink-400' : item.type === 'Carousel' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {item.type === 'Video' ? <VideoIcon size={18} /> : item.type === 'Carousel' ? <ImageIcon size={18} /> : <FileTextIcon size={18} />}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white">
                              {item.title}
                            </h4>
                            <div className="flex items-center mt-1 space-x-2">
                              <span className="text-xs text-gray-400">
                                {item.platform}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-400">
                                {item.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">
                            {item.views}
                          </div>
                          <div className={`flex items-center justify-end mt-1 text-xs ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {item.isPositive ? <ArrowUpIcon size={12} className="mr-1" /> : <ArrowDownIcon size={12} className="mr-1" />}
                            {item.engagement}
                          </div>
                        </div>
                      </div>
                    </div>)}
              </div>
            </Card>
          </GridItem>
          {/* Right column - 1/3 width */}
          <GridItem colSpan={{
          lg: 1
        }} className="space-y-6">
            {isLoading ? <>
                <LoadingState variant="skeleton" height="h-64" />
                <LoadingState variant="skeleton" height="h-64" />
                <LoadingState variant="skeleton" height="h-64" />
              </> : <>
                <AffiliateStatsWidget />
                {/* AI Assistant Card */}
                <GlassCard className="hover:shadow-lg transition-all duration-300">
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <SparklesIcon size={16} className="text-purple-500" />
                        AI Assistant
                      </h3>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        New
                      </span>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-700/30">
                      <p className="text-sm text-gray-300 mb-3">
                        Let AI help you create engaging content and optimize
                        your workflow.
                      </p>
                      <Button variant="neon" className="w-full justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-none shadow-md shadow-purple-500/20" onClick={handleCreateContent} ariaLabel="Try AI assistant features">
                        Try AI Assistant
                      </Button>
                    </div>
                    <div className="pt-3 border-t border-gray-700">
                      <Link to="/content" className="flex items-center justify-between text-purple-400 text-sm hover:text-purple-300 transition-colors focus:outline-none focus:underline" aria-label="Explore all AI features">
                        <span>Explore AI Features</span>
                        <ArrowRightIcon size={16} className="animate-pulse-slow" />
                      </Link>
                    </div>
                  </div>
                </GlassCard>
                {/* Audience Growth Card */}
                <Card className="overflow-hidden">
                  <div className="p-5 border-b border-gray-700">
                    <h3 className="font-medium text-lg text-white flex items-center gap-2">
                      <UsersIcon size={18} className="text-blue-400" />
                      Audience Growth
                    </h3>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm text-gray-400">
                          Total Followers
                        </span>
                        <div className="text-2xl font-bold text-white mt-1">
                          24,892
                        </div>
                      </div>
                      <div className="flex items-center text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                        <TrendingUpIcon size={14} className="mr-1" />
                        <span className="text-xs font-medium">+12.5%</span>
                      </div>
                    </div>
                    <div className="h-40 mb-4">
                      <MiniAreaChart data={[18500, 19200, 20100, 20800, 21500, 22300, 23400, 24892]} color="#60A5FA" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-700">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">
                          New Followers
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-white">
                            +1,492
                          </span>
                          <span className="ml-2 text-xs text-green-400 flex items-center">
                            <ArrowUpIcon size={12} className="mr-0.5" />
                            8.3%
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">
                          Engagement
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-white">
                            6.8%
                          </span>
                          <span className="ml-2 text-xs text-green-400 flex items-center">
                            <ArrowUpIcon size={12} className="mr-0.5" />
                            2.1%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                {/* Recent Activity Card */}
                <Card className="overflow-hidden">
                  <div className="p-5 border-b border-gray-700">
                    <h3 className="font-medium text-lg text-white flex items-center gap-2">
                      <ClockIcon size={18} className="text-amber-400" />
                      Recent Activity
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-700">
                    {[{
                  title: 'New follower gained',
                  description: 'Someone started following your account',
                  time: '2 hours ago',
                  icon: <UsersIcon size={16} />,
                  color: 'bg-blue-500/20 text-blue-400'
                }, {
                  title: 'Content published',
                  description: '"10 Productivity Tips" went live on Instagram',
                  time: '5 hours ago',
                  icon: <CheckCircleIcon size={16} />,
                  color: 'bg-green-500/20 text-green-400'
                }, {
                  title: 'Post scheduled',
                  description: '"Future of AI" scheduled for tomorrow',
                  time: 'Yesterday',
                  icon: <CalendarIcon size={16} />,
                  color: 'bg-amber-500/20 text-amber-400'
                }].map((activity, index) => <div key={index} className="p-4 hover:bg-gray-800/30 transition-colors">
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.color}`}>
                            {activity.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white">
                              {activity.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              {activity.description}
                            </p>
                            <span className="text-xs text-gray-500 mt-2 block">
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>)}
                  </div>
                  <div className="p-4 border-t border-gray-700">
                    <Link to="/analytics" className="flex items-center justify-center text-sm text-gray-400 hover:text-white transition-colors focus:outline-none focus:underline" aria-label="View all activity history">
                      View All Activity
                    </Link>
                  </div>
                </Card>
              </>}
          </GridItem>
        </Grid>
      </div>
      {/* Tour guide */}
      <TourGuide steps={tourSteps} isOpen={showTour} onClose={() => setShowTour(false)} onComplete={completeTour} />
    </div>;
};
// Data card component with micro-chart
const DataCard = ({
  title,
  value,
  change,
  isPositive,
  icon,
  chart
}) => {
  return <Card className={`relative overflow-hidden hover:shadow-md transition-shadow hover:-translate-y-0.5 group`}>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                {icon}
              </div>
              <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            </div>
            <p className="text-2xl font-bold text-white group-hover:text-[#3FE0A5] transition-colors duration-300">
              {value}
            </p>
            <span className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full inline-flex items-center ${isPositive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
              {isPositive ? <ArrowUpIcon size={12} className="mr-1" /> : <ArrowDownIcon size={12} className="mr-1" />}
              {change}
            </span>
          </div>
          <div className="w-24 h-16">{chart}</div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#3FE0A5]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Card>;
};
// Quick Action Button Component
const QuickActionButton = ({
  icon,
  label,
  onClick,
  href
}) => {
  const content = <div className="flex flex-col items-center gap-1 w-16 py-2 hover:bg-white/5 rounded-lg transition-colors">
      <div className="w-8 h-8 rounded-full bg-[#3FE0A5]/20 flex items-center justify-center text-[#3FE0A5] group-hover:bg-[#3FE0A5]/30 transition-colors">
        {icon}
      </div>
      <span className="text-xs text-gray-300 text-center">{label}</span>
    </div>;
  if (href) {
    return <Link to={href} className="group">
        {content}
      </Link>;
  }
  return <button onClick={onClick} className="group">
      {content}
    </button>;
};
// Mini Line Chart Component for Data Cards
const MiniLineChart = ({
  data,
  color
}) => {
  // Calculate points for the SVG path
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const width = 100;
  const height = 40;
  const points = data.map((value, index) => {
    const x = index / (data.length - 1) * width;
    const y = height - (value - min) / range * height;
    return `${x},${y}`;
  }).join(' ');
  return <div className="w-full h-full flex items-end">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <path d={`M0,${height} ${points} ${width},${height} Z`} fill={`url(#gradient-${color.replace('#', '')})`} />
        {/* Line */}
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Last point highlight */}
        <circle cx={width} cy={height - (data[data.length - 1] - min) / range * height} r="3" fill={color} />
      </svg>
    </div>;
};
// Mini Area Chart Component for larger charts
const MiniAreaChart = ({
  data,
  color
}) => {
  // Calculate points for the SVG path
  const max = Math.max(...data);
  const min = Math.min(...data) * 0.9; // Add some padding at the bottom
  const range = max - min;
  const width = 100;
  const height = 100;
  const points = data.map((value, index) => {
    const x = index / (data.length - 1) * width;
    const y = height - (value - min) / range * height;
    return `${x},${y}`;
  }).join(' ');
  // Create month labels
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const labels = months.slice(0, data.length);
  return <div className="w-full h-full flex flex-col">
      <div className="flex-1">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id={`area-gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          <line x1="0" y1={height} x2={width} y2={height} stroke="#374151" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#374151" strokeWidth="1" strokeDasharray="4,4" />
          {/* Area fill */}
          <path d={`M0,${height} ${points} ${width},${height} Z`} fill={`url(#area-gradient-${color.replace('#', '')})`} />
          {/* Line */}
          <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Data points */}
          {data.map((value, index) => {
          const x = index / (data.length - 1) * width;
          const y = height - (value - min) / range * height;
          return <circle key={index} cx={x} cy={y} r="2" fill={color} />;
        })}
          {/* Last point highlight */}
          <circle cx={width} cy={height - (data[data.length - 1] - min) / range * height} r="3" fill={color} stroke="#1F2937" strokeWidth="1" />
        </svg>
      </div>
      <div className="flex justify-between mt-2">
        {labels.map((month, index) => <div key={index} className="text-xs text-gray-500">
            {index % 2 === 0 ? month : ''}
          </div>)}
      </div>
    </div>;
};
// Icons
const VideoIcon = ({
  size,
  className
}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>;
const ImageIcon = ({
  size,
  className
}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>;
const FileTextIcon = ({
  size,
  className
}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>;
const MicIcon = ({
  size,
  className
}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>;