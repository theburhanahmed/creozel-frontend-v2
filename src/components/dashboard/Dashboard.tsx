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
    content: 'Track your content performance with these key metrics.',
    position: 'bottom'
  }, {
    target: '.analytics-chart',
    title: 'Analytics Dashboard',
    content: 'View your performance trends over time with this interactive chart.',
    position: 'top'
  }, {
    target: '.content-creation-panel',
    title: 'Create Content',
    content: 'Start creating content with our AI-powered tools.',
    position: 'right'
  }, {
    target: '.upcoming-posts',
    title: 'Scheduled Content',
    content: 'See your upcoming scheduled posts and manage your content calendar.',
    position: 'left'
  }];
  return <div className="w-full space-y-8">
      {/* Welcome Banner */}
      <GlassCard className="welcome-banner relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 dark:from-gray-900/95 dark:to-gray-800/95 border-none p-0 shadow-2xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#3FE0A5]/10 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-200"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] animate-pulse-slow animation-delay-400"></div>
        </div>
        <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-5 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3FE0A5] to-[#38B897] flex items-center justify-center shadow-2xl shadow-[#3FE0A5]/30 animate-in zoom-in duration-300">
                <SparklesIcon size={28} className="text-white" />
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-semibold text-white border border-white/10 shadow-lg">
                <span className="animate-pulse mr-2.5 w-2.5 h-2.5 rounded-full bg-[#3FE0A5] shadow-lg shadow-[#3FE0A5]/50"></span>
                AI-Powered Recommendations
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-[#3FE0A5] to-[#38B897] text-transparent bg-clip-text">
                {user?.name || 'Content Creator'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
              Based on your recent activity, we recommend focusing on video
              content for Instagram. Your audience engagement has increased by
              <span className="font-semibold text-[#3FE0A5] mx-1">15%</span>
              with this type of content.
            </p>
            <div className="flex flex-wrap gap-4 pt-3">
              <Button variant="primary" leftIcon={<PlusIcon size={20} />} onClick={handleCreateContent} className="bg-gradient-to-r from-[#3FE0A5] to-[#38B897] hover:from-[#38B897] hover:to-[#3FE0A5] shadow-2xl shadow-[#3FE0A5]/30 hover:shadow-[#3FE0A5]/40 border-none px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-105">
                Create Content
              </Button>
              <Button variant="outline" leftIcon={<InfoIcon size={20} />} onClick={() => setShowTour(true)} className="border-white/30 hover:bg-white/10 text-white backdrop-blur-md px-6 py-3 text-base font-semibold transition-all duration-300 hover:border-white/40">
                Dashboard Guide
              </Button>
            </div>
          </div>
          {/* Animated orb */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-r from-[#3FE0A5]/20 to-[#38B897]/20 animate-pulse-slow blur-xl"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-gradient-to-r from-[#3FE0A5]/30 to-[#38B897]/30 animate-pulse-slow animation-delay-200 blur-lg"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#3FE0A5] to-[#38B897] flex items-center justify-center shadow-2xl shadow-[#3FE0A5]/40 animate-float">
                  <SparklesIcon size={32} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
      {/* Stats Overview */}
      <div className="stats-overview grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? <>
            <LoadingState variant="skeleton" height="h-32" />
            <LoadingState variant="skeleton" height="h-32" />
            <LoadingState variant="skeleton" height="h-32" />
            <LoadingState variant="skeleton" height="h-32" />
          </> : <>
            <DataCard title="Total Views" value="248.5K" change="+12.5%" isPositive={true} icon={<EyeIcon size={22} className="text-blue-400" />} chart={<MiniLineChart data={[15, 25, 20, 30, 25, 35, 40]} color="#60A5FA" />} gradient="from-blue-500/10 to-indigo-500/10" />
            <DataCard title="Engagement Rate" value="5.2%" change="+0.8%" isPositive={true} icon={<HeartIcon size={22} className="text-pink-400" />} chart={<MiniLineChart data={[5, 7, 4, 6, 5, 8, 7]} color="#F472B6" />} gradient="from-pink-500/10 to-rose-500/10" />
            <DataCard title="Conversion Rate" value="3.1%" change="-0.2%" isPositive={false} icon={<TargetIcon size={22} className="text-amber-400" />} chart={<MiniLineChart data={[3, 4, 3.5, 2.8, 3.2, 3, 2.9]} color="#FBBF24" />} gradient="from-amber-500/10 to-orange-500/10" />
            <DataCard title="Avg. Watch Time" value="2:45" change="+0:15" isPositive={true} icon={<ClockIcon size={22} className="text-green-400" />} chart={<MiniLineChart data={[2, 2.2, 2.4, 2.3, 2.5, 2.7, 2.8]} color="#34D399" />} gradient="from-green-500/10 to-emerald-500/10" />
          </>}
      </div>
      {/* Main Grid Layout */}
      <Grid className="gap-6">
        {/* Left column - 2/3 width */}
        <GridItem colSpan={{
        lg: 2
      }} className="space-y-6">
          {/* Analytics Chart */}
          <Card className="overflow-hidden analytics-chart shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200/50 dark:border-gray-700/50">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/30">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3FE0A5]/20 to-[#38B897]/20 flex items-center justify-center">
                    <BarChart2Icon size={20} className="text-[#3FE0A5]" />
                  </div>
                  Performance Overview
                </h3>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <button className="px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 font-medium">
                    1Y
                  </button>
                  <button className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-[#3FE0A5] to-[#38B897] text-white font-semibold shadow-lg shadow-[#3FE0A5]/20">
                    6M
                  </button>
                  <button className="px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 font-medium">
                    30D
                  </button>
                  <button className="px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 font-medium">
                    7D
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-b from-transparent to-gray-50/30 dark:to-gray-800/20">
              {isLoading ? <LoadingState variant="skeleton" height="h-72" /> : <div className="h-72">
                  <AnalyticsChart />
                </div>}
            </div>
          </Card>
          {/* Content Creation and Upcoming Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="content-creation-panel">
              {isLoading ? <LoadingState variant="skeleton" height="h-80" /> : <ContentCreationPanel onCreateContent={handleCreateContent} />}
            </div>
            <div className="upcoming-posts">
              {isLoading ? <LoadingState variant="skeleton" height="h-80" /> : <UpcomingPosts />}
            </div>
          </div>
          {/* Content Performance */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200/50 dark:border-gray-700/50">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/30">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <BarChartIcon size={20} className="text-indigo-500" />
                  </div>
                  Content Performance
                </h3>
                <Link to="/analytics">
                  <Button variant="outline" size="sm" className="font-semibold hover:shadow-md transition-all duration-200">
                    View All
                  </Button>
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? <>
                  <LoadingState variant="skeleton" height="h-24" />
                  <LoadingState variant="skeleton" height="h-24" />
                  <LoadingState variant="skeleton" height="h-24" />
                </> : [{
              title: '10 Productivity Hacks',
              type: 'Video',
              platform: 'Instagram',
              views: '45.2K',
              engagement: '8.3%',
              isPositive: true
            }, {
              title: 'Social Media Strategy 2024',
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
            }].map((item, index) => <div key={index} className="p-6 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-transparent dark:hover:from-gray-800/30 dark:hover:to-transparent transition-all duration-300 cursor-pointer group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${item.type === 'Video' ? 'bg-gradient-to-br from-pink-500/10 to-rose-500/10 text-pink-500 group-hover:shadow-lg group-hover:shadow-pink-500/20' : item.type === 'Carousel' ? 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/20' : 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 text-amber-500 group-hover:shadow-lg group-hover:shadow-amber-500/20'}`}>
                          {item.type === 'Video' ? <VideoIcon size={24} /> : item.type === 'Carousel' ? <ImageIcon size={24} /> : <FileTextIcon size={24} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#3FE0A5] transition-colors duration-200">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">{item.platform}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                            <span>{item.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {item.views}
                        </div>
                        <div className={`flex items-center justify-end text-sm font-semibold px-3 py-1 rounded-lg ${item.isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                          {item.isPositive ? <ArrowUpIcon size={14} className="mr-1" /> : <ArrowDownIcon size={14} className="mr-1" />}
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
              <GlassCard className="hover:shadow-xl transition-all duration-300">
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <SparklesIcon size={18} className="text-purple-500" />
                      AI Assistant
                    </h3>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      New
                    </span>
                  </div>
                  <div className="p-5 rounded-xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-700/30">
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                      Let AI help you create engaging content and optimize your
                      workflow.
                    </p>
                    <Button variant="primary" className="w-full justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/20" onClick={handleCreateContent}>
                      Try AI Assistant
                    </Button>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link to="/content" className="flex items-center justify-between text-purple-600 dark:text-purple-400 text-sm hover:text-purple-700 dark:hover:text-purple-300 transition-colors group">
                      <span>Explore AI Features</span>
                      <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
              {/* Audience Growth Card */}
              <Card className="overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <UsersIcon size={20} className="text-blue-400" />
                    Audience Growth
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total Followers
                      </span>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                        24,892
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg">
                      <TrendingUpIcon size={16} />
                      <span className="text-sm font-semibold">+12.5%</span>
                    </div>
                  </div>
                  <div className="h-40 mb-6">
                    <MiniAreaChart data={[18500, 19200, 20100, 20800, 21500, 22300, 23400, 24892]} color="#60A5FA" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-5 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        New Followers
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          +1,492
                        </span>
                        <span className="text-xs text-green-600 dark:text-green-400 flex items-center font-medium">
                          <ArrowUpIcon size={12} className="mr-0.5" />
                          8.3%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        Engagement
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          6.8%
                        </span>
                        <span className="text-xs text-green-600 dark:text-green-400 flex items-center font-medium">
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
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <ClockIcon size={20} className="text-amber-400" />
                    Recent Activity
                  </h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[{
                title: 'New follower gained',
                description: 'Someone started following your account',
                time: '2 hours ago',
                icon: <UsersIcon size={18} />,
                color: 'bg-blue-500/10 text-blue-400'
              }, {
                title: 'Content published',
                description: '"10 Productivity Tips" went live on Instagram',
                time: '5 hours ago',
                icon: <CheckCircleIcon size={18} />,
                color: 'bg-green-500/10 text-green-400'
              }, {
                title: 'Post scheduled',
                description: '"Future of AI" scheduled for tomorrow',
                time: 'Yesterday',
                icon: <CalendarIcon size={18} />,
                color: 'bg-amber-500/10 text-amber-400'
              }].map((activity, index) => <div key={index} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                            {activity.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {activity.description}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>)}
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <Link to="/analytics" className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    View All Activity
                  </Link>
                </div>
              </Card>
            </>}
        </GridItem>
      </Grid>
      {/* Tour guide */}
      <TourGuide steps={tourSteps} isOpen={showTour} onClose={() => setShowTour(false)} onComplete={completeTour} />
    </div>;
};
// Enhanced Data card component with micro-chart
const DataCard = ({
  title,
  value,
  change,
  isPositive,
  icon,
  chart,
  gradient
}) => {
  return <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-gray-200/50 dark:border-gray-700/50">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                {title}
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-[#3FE0A5] transition-colors duration-300 mb-3">
              {value}
            </p>
            <span className={`text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center shadow-sm ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
              {isPositive ? <ArrowUpIcon size={14} className="mr-1.5" /> : <ArrowDownIcon size={14} className="mr-1.5" />}
              {change}
            </span>
          </div>
          <div className="w-28 h-20">{chart}</div>
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