import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
export const AnalyticsChart = () => {
  const data = [{
    name: 'Jan',
    views: 4000,
    engagement: 2400,
    conversion: 1200
  }, {
    name: 'Feb',
    views: 3000,
    engagement: 1398,
    conversion: 800
  }, {
    name: 'Mar',
    views: 2000,
    engagement: 9800,
    conversion: 1800
  }, {
    name: 'Apr',
    views: 2780,
    engagement: 3908,
    conversion: 1500
  }, {
    name: 'May',
    views: 1890,
    engagement: 4800,
    conversion: 1700
  }, {
    name: 'Jun',
    views: 2390,
    engagement: 3800,
    conversion: 1500
  }, {
    name: 'Jul',
    views: 3490,
    engagement: 4300,
    conversion: 2100
  }];
  return <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{
      top: 10,
      right: 10,
      left: 0,
      bottom: 0
    }}>
        <defs>
          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3FE0A5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3FE0A5" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{
        fill: '#9CA3AF',
        fontSize: 12
      }} />
        <YAxis axisLine={false} tickLine={false} tick={{
        fill: '#9CA3AF',
        fontSize: 12
      }} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.2)" />
        <Tooltip contentStyle={{
        backgroundColor: '#1A2234',
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }} itemStyle={{
        color: '#F3F4F6'
      }} labelStyle={{
        color: '#F3F4F6',
        fontWeight: 'bold',
        marginBottom: '0.5rem'
      }} />
        <Legend verticalAlign="top" height={36} wrapperStyle={{
        paddingTop: '10px'
      }} formatter={value => <span style={{
        color: '#9CA3AF',
        fontSize: '12px'
      }}>
              {value}
            </span>} />
        <Area type="monotone" dataKey="views" stroke="#3FE0A5" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
        <Area type="monotone" dataKey="engagement" stroke="#6366F1" fillOpacity={1} fill="url(#colorEngagement)" strokeWidth={2} />
        <Area type="monotone" dataKey="conversion" stroke="#F59E0B" fillOpacity={1} fill="url(#colorConversion)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>;
};