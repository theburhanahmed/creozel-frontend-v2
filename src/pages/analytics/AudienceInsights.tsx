import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { UsersIcon, TrendingUpIcon, MapPinIcon, ClockIcon, SmartphoneIcon, GlobeIcon, HeartIcon, MessageCircleIcon, ShareIcon, EyeIcon, DownloadIcon, CalendarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
export const AudienceInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState('demographics');
  const [timeRange, setTimeRange] = useState('30d');
  const tabs = [{
    id: 'demographics',
    label: 'Demographics'
  }, {
    id: 'behavior',
    label: 'Behavior'
  }, {
    id: 'interests',
    label: 'Interests'
  }, {
    id: 'devices',
    label: 'Devices & Platforms'
  }];
  const demographics = {
    ageGroups: [{
      range: '18-24',
      percentage: 28,
      count: '42.3K'
    }, {
      range: '25-34',
      percentage: 35,
      count: '52.8K'
    }, {
      range: '35-44',
      percentage: 22,
      count: '33.2K'
    }, {
      range: '45-54',
      percentage: 10,
      count: '15.1K'
    }, {
      range: '55+',
      percentage: 5,
      count: '7.5K'
    }],
    gender: [{
      type: 'Female',
      percentage: 58,
      count: '87.5K',
      color: 'from-pink-500 to-rose-600'
    }, {
      type: 'Male',
      percentage: 40,
      count: '60.4K',
      color: 'from-blue-500 to-indigo-600'
    }, {
      type: 'Other',
      percentage: 2,
      count: '3.0K',
      color: 'from-purple-500 to-indigo-600'
    }],
    topLocations: [{
      country: 'United States',
      city: 'New York',
      percentage: 22,
      count: '33.2K',
      flag: '🇺🇸'
    }, {
      country: 'United Kingdom',
      city: 'London',
      percentage: 15,
      count: '22.6K',
      flag: '🇬🇧'
    }, {
      country: 'Canada',
      city: 'Toronto',
      percentage: 12,
      count: '18.1K',
      flag: '🇨🇦'
    }, {
      country: 'Australia',
      city: 'Sydney',
      percentage: 10,
      count: '15.1K',
      flag: '🇦🇺'
    }, {
      country: 'Germany',
      city: 'Berlin',
      percentage: 8,
      count: '12.1K',
      flag: '🇩🇪'
    }]
  };
  const behaviorMetrics = [{
    label: 'Avg. Session Duration',
    value: '4:32',
    change: '+12%',
    icon: <ClockIcon size={18} />,
    color: 'from-blue-500 to-cyan-600'
  }, {
    label: 'Pages Per Session',
    value: '5.8',
    change: '+8%',
    icon: <EyeIcon size={18} />,
    color: 'from-purple-500 to-indigo-600'
  }, {
    label: 'Engagement Rate',
    value: '6.8%',
    change: '+15%',
    icon: <HeartIcon size={18} />,
    color: 'from-pink-500 to-rose-600'
  }, {
    label: 'Return Visitor Rate',
    value: '42%',
    change: '+5%',
    icon: <UsersIcon size={18} />,
    color: 'from-green-500 to-emerald-600'
  }];
  const peakActivityTimes = [{
    day: 'Monday',
    hours: ['9AM', '12PM', '6PM'],
    activity: 'High'
  }, {
    day: 'Tuesday',
    hours: ['10AM', '1PM', '7PM'],
    activity: 'High'
  }, {
    day: 'Wednesday',
    hours: ['9AM', '12PM', '5PM'],
    activity: 'Very High'
  }, {
    day: 'Thursday',
    hours: ['10AM', '2PM', '6PM'],
    activity: 'High'
  }, {
    day: 'Friday',
    hours: ['11AM', '3PM', '7PM'],
    activity: 'Medium'
  }, {
    day: 'Saturday',
    hours: ['12PM', '4PM', '8PM'],
    activity: 'Medium'
  }, {
    day: 'Sunday',
    hours: ['11AM', '3PM', '7PM'],
    activity: 'Low'
  }];
  const topInterests = [{
    category: 'Technology',
    percentage: 68,
    followers: '102.7K'
  }, {
    category: 'Business',
    percentage: 54,
    followers: '81.5K'
  }, {
    category: 'Marketing',
    percentage: 48,
    followers: '72.4K'
  }, {
    category: 'Design',
    percentage: 42,
    followers: '63.4K'
  }, {
    category: 'Entrepreneurship',
    percentage: 38,
    followers: '57.3K'
  }, {
    category: 'Social Media',
    percentage: 35,
    followers: '52.8K'
  }];
  const deviceBreakdown = [{
    type: 'Mobile',
    percentage: 65,
    count: '98.1K',
    icon: <SmartphoneIcon size={18} />,
    color: 'from-blue-500 to-cyan-600'
  }, {
    type: 'Desktop',
    percentage: 28,
    count: '42.3K',
    icon: <GlobeIcon size={18} />,
    color: 'from-purple-500 to-indigo-600'
  }, {
    type: 'Tablet',
    percentage: 7,
    count: '10.6K',
    icon: <SmartphoneIcon size={18} />,
    color: 'from-amber-500 to-orange-600'
  }];
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UsersIcon size={28} className="text-[#3FE0A5]" />
            Audience Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Understand your audience demographics, behavior, and preferences
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<CalendarIcon size={16} />}>
            {timeRange === '7d' ? 'Last 7 days' : timeRange === '30d' ? 'Last 30 days' : 'Last 90 days'}
          </Button>
          <Button variant="outline" leftIcon={<DownloadIcon size={16} />}>
            Export Report
          </Button>
        </div>
      </div>
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden">
          <div className="p-5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#3FE0A5] to-[#38B897] flex items-center justify-center text-white mb-3">
              <UsersIcon size={18} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Total Audience
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              150.9K
            </p>
            <span className="text-xs text-green-500 font-medium">
              +12.3% this month
            </span>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="p-5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white mb-3">
              <TrendingUpIcon size={18} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Growth Rate
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              +18.7%
            </p>
            <span className="text-xs text-green-500 font-medium">
              +3.2% vs last month
            </span>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="p-5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white mb-3">
              <HeartIcon size={18} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Avg. Engagement
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              6.8%
            </p>
            <span className="text-xs text-green-500 font-medium">
              +1.2% this month
            </span>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="p-5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white mb-3">
              <ClockIcon size={18} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Avg. Time Spent
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              4:32
            </p>
            <span className="text-xs text-green-500 font-medium">
              +0:45 this month
            </span>
          </div>
        </Card>
      </div>
      {/* Main Content */}
      <Card>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="enclosed" />
        <div className="p-6">
          {activeTab === 'demographics' && <div className="space-y-8">
              {/* Age Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Age Distribution
                </h3>
                <div className="space-y-3">
                  {demographics.ageGroups.map((group, index) => <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          {group.range} years
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {group.percentage}% ({group.count})
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#3FE0A5] to-[#38B897] transition-all duration-500" style={{
                    width: `${group.percentage}%`
                  }} />
                      </div>
                    </div>)}
                </div>
              </div>
              {/* Gender Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Gender Distribution
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {demographics.gender.map((item, index) => <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                        {item.percentage}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {item.type}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.count}
                      </p>
                    </div>)}
                </div>
              </div>
              {/* Top Locations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MapPinIcon size={20} className="text-[#3FE0A5]" />
                  Top Locations
                </h3>
                <div className="space-y-3">
                  {demographics.topLocations.map((location, index) => <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{location.flag}</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {location.country}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {location.city}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {location.percentage}%
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {location.count}
                        </p>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}
          {activeTab === 'behavior' && <div className="space-y-8">
              {/* Behavior Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {behaviorMetrics.map((metric, index) => <Card key={index} className="relative overflow-hidden">
                    <div className="p-5">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center text-white mb-3`}>
                        {metric.icon}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metric.value}
                      </p>
                      <span className="text-xs text-green-500 font-medium">
                        {metric.change}
                      </span>
                    </div>
                  </Card>)}
              </div>
              {/* Peak Activity Times */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ClockIcon size={20} className="text-[#3FE0A5]" />
                  Peak Activity Times
                </h3>
                <div className="space-y-2">
                  {peakActivityTimes.map((day, index) => <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="font-medium text-gray-900 dark:text-white w-24">
                            {day.day}
                          </span>
                          <div className="flex items-center gap-2">
                            {day.hours.map((hour, idx) => <span key={idx} className="px-2 py-1 rounded bg-[#3FE0A5]/10 text-[#3FE0A5] text-xs font-medium">
                                {hour}
                              </span>)}
                          </div>
                        </div>
                        <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', day.activity === 'Very High' && 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', day.activity === 'High' && 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', day.activity === 'Medium' && 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300', day.activity === 'Low' && 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300')}>
                          {day.activity}
                        </span>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}
          {activeTab === 'interests' && <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top Interests & Topics
              </h3>
              <div className="space-y-3">
                {topInterests.map((interest, index) => <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {interest.category}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {interest.percentage}% ({interest.followers})
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#3FE0A5] to-[#38B897] transition-all duration-500" style={{
                  width: `${interest.percentage}%`
                }} />
                    </div>
                  </div>)}
              </div>
            </div>}
          {activeTab === 'devices' && <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {deviceBreakdown.map((device, index) => <div key={index} className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${device.color} flex items-center justify-center text-white mb-4`}>
                      {device.icon}
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {device.type}
                    </h4>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {device.percentage}%
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {device.count} users
                    </p>
                  </div>)}
              </div>
            </div>}
        </div>
      </Card>
    </div>;
};