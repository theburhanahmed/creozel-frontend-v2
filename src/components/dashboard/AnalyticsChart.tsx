import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
export const AnalyticsChart: React.FC = () => {
  const [chartType, setChartType] = useState<'line' | 'area'>('area');
  const data = [{
    date: 'Jan',
    views: 12500,
    engagement: 3200,
    conversions: 850
  }, {
    date: 'Feb',
    views: 15800,
    engagement: 4100,
    conversions: 1050
  }, {
    date: 'Mar',
    views: 14200,
    engagement: 3800,
    conversions: 920
  }, {
    date: 'Apr',
    views: 18900,
    engagement: 5200,
    conversions: 1380
  }, {
    date: 'May',
    views: 21500,
    engagement: 6100,
    conversions: 1620
  }, {
    date: 'Jun',
    views: 24800,
    engagement: 7300,
    conversions: 1950
  }];
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            {label}
          </p>
          {payload.map((entry: any, index: number) => <div key={index} className="flex items-center justify-between gap-4 mb-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{
              backgroundColor: entry.color
            }} />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {entry.name}:
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-900 dark:text-white">
                {entry.value.toLocaleString()}
              </span>
            </div>)}
        </div>;
    }
    return null;
  };
  return <ResponsiveContainer width="100%" height="100%">
      {chartType === 'area' ? <AreaChart data={data}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3FE0A5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3FE0A5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis dataKey="date" stroke="#9CA3AF" style={{
        fontSize: '12px'
      }} />
          <YAxis stroke="#9CA3AF" style={{
        fontSize: '12px'
      }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{
        fontSize: '12px',
        paddingTop: '20px'
      }} iconType="circle" />
          <Area type="monotone" dataKey="views" stroke="#3FE0A5" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" name="Views" />
          <Area type="monotone" dataKey="engagement" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorEngagement)" name="Engagement" />
          <Area type="monotone" dataKey="conversions" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorConversions)" name="Conversions" />
        </AreaChart> : <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis dataKey="date" stroke="#9CA3AF" style={{
        fontSize: '12px'
      }} />
          <YAxis stroke="#9CA3AF" style={{
        fontSize: '12px'
      }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{
        fontSize: '12px',
        paddingTop: '20px'
      }} iconType="circle" />
          <Line type="monotone" dataKey="views" stroke="#3FE0A5" strokeWidth={2} dot={{
        r: 4
      }} activeDot={{
        r: 6
      }} name="Views" />
          <Line type="monotone" dataKey="engagement" stroke="#8B5CF6" strokeWidth={2} dot={{
        r: 4
      }} activeDot={{
        r: 6
      }} name="Engagement" />
          <Line type="monotone" dataKey="conversions" stroke="#F59E0B" strokeWidth={2} dot={{
        r: 4
      }} activeDot={{
        r: 6
      }} name="Conversions" />
        </LineChart>}
    </ResponsiveContainer>;
};