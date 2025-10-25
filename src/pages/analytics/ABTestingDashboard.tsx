import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressIndicator } from '../../components/ui/ProgressIndicator';
import { FlaskConicalIcon, PlayIcon, PauseIcon, StopCircleIcon, PlusIcon, TrendingUpIcon, EyeIcon, MousePointerClickIcon, CheckCircleIcon, XCircleIcon, ClockIcon, BarChart3Icon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface ABTest {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  variantA: {
    name: string;
    thumbnail?: string;
    views: number;
    clicks: number;
    conversions: number;
    conversionRate: number;
  };
  variantB: {
    name: string;
    thumbnail?: string;
    views: number;
    clicks: number;
    conversions: number;
    conversionRate: number;
  };
  startDate: string;
  endDate?: string;
  progress: number;
  winner?: 'A' | 'B' | null;
  confidence: number;
}
export const ABTestingDashboard: React.FC = () => {
  const [tests, setTests] = useState<ABTest[]>([{
    id: '1',
    name: 'Instagram Caption Test - Product Launch',
    status: 'running',
    variantA: {
      name: 'Variant A: Emoji-heavy',
      views: 12500,
      clicks: 850,
      conversions: 127,
      conversionRate: 14.9
    },
    variantB: {
      name: 'Variant B: Professional tone',
      views: 12300,
      clicks: 920,
      conversions: 156,
      conversionRate: 17.0
    },
    startDate: '2 days ago',
    progress: 65,
    winner: null,
    confidence: 78
  }, {
    id: '2',
    name: 'Video Thumbnail Test',
    status: 'completed',
    variantA: {
      name: 'Variant A: Face close-up',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&auto=format&fit=crop&q=60',
      views: 45000,
      clicks: 3200,
      conversions: 890,
      conversionRate: 27.8
    },
    variantB: {
      name: 'Variant B: Action shot',
      thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&auto=format&fit=crop&q=60',
      views: 44800,
      clicks: 2800,
      conversions: 720,
      conversionRate: 25.7
    },
    startDate: '1 week ago',
    endDate: 'Yesterday',
    progress: 100,
    winner: 'A',
    confidence: 95
  }, {
    id: '3',
    name: 'CTA Button Color Test',
    status: 'paused',
    variantA: {
      name: 'Variant A: Green button',
      views: 8900,
      clicks: 620,
      conversions: 89,
      conversionRate: 14.4
    },
    variantB: {
      name: 'Variant B: Orange button',
      views: 8700,
      clicks: 580,
      conversions: 82,
      conversionRate: 14.1
    },
    startDate: '3 days ago',
    progress: 42,
    winner: null,
    confidence: 52
  }]);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'paused':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <PlayIcon size={14} />;
      case 'paused':
        return <PauseIcon size={14} />;
      case 'completed':
        return <CheckCircleIcon size={14} />;
      default:
        return <ClockIcon size={14} />;
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FlaskConicalIcon size={28} className="text-[#3FE0A5]" />
            A/B Testing
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Test and optimize your content performance with data-driven
            experiments
          </p>
        </div>
        <Button variant="primary" leftIcon={<PlusIcon size={16} />}>
          Create New Test
        </Button>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{
        label: 'Active Tests',
        value: '1',
        icon: <PlayIcon size={18} />,
        color: 'from-green-500 to-emerald-600'
      }, {
        label: 'Completed Tests',
        value: '1',
        icon: <CheckCircleIcon size={18} />,
        color: 'from-blue-500 to-cyan-600'
      }, {
        label: 'Total Variants Tested',
        value: '6',
        icon: <FlaskConicalIcon size={18} />,
        color: 'from-purple-500 to-indigo-600'
      }, {
        label: 'Avg. Improvement',
        value: '+12.3%',
        icon: <TrendingUpIcon size={18} />,
        color: 'from-amber-500 to-orange-600'
      }].map((stat, index) => <Card key={index} className="relative overflow-hidden">
            <div className="p-5">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-3`}>
                {stat.icon}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
          </Card>)}
      </div>
      {/* Tests List */}
      <div className="space-y-4">
        {tests.map(test => <Card key={test.id} className="overflow-hidden">
            <div className="p-6">
              {/* Test Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {test.name}
                    </h3>
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1', getStatusColor(test.status))}>
                      {getStatusIcon(test.status)}
                      {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Started {test.startDate}</span>
                    {test.endDate && <span>• Ended {test.endDate}</span>}
                    <span>• {test.confidence}% confidence</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {test.status === 'running' && <>
                      <Button variant="outline" size="sm" leftIcon={<PauseIcon size={14} />}>
                        Pause
                      </Button>
                      <Button variant="outline" size="sm" leftIcon={<StopCircleIcon size={14} />}>
                        Stop
                      </Button>
                    </>}
                  {test.status === 'paused' && <Button variant="primary" size="sm" leftIcon={<PlayIcon size={14} />}>
                      Resume
                    </Button>}
                </div>
              </div>
              {/* Progress */}
              {test.status !== 'completed' && <div className="mb-6">
                  <ProgressIndicator value={test.progress} variant="line" size="md" animated label="Test Progress" />
                </div>}
              {/* Variants Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Variant A */}
                <div className={cn('p-4 rounded-lg border-2 transition-all', test.winner === 'A' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50')}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {test.variantA.name}
                    </h4>
                    {test.winner === 'A' && <span className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium flex items-center gap-1">
                        <CheckCircleIcon size={12} />
                        Winner
                      </span>}
                  </div>
                  {test.variantA.thumbnail && <img src={test.variantA.thumbnail} alt={test.variantA.name} className="w-full h-32 object-cover rounded-lg mb-3" />}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <EyeIcon size={14} />
                        Views
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {test.variantA.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <MousePointerClickIcon size={14} />
                        Clicks
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {test.variantA.clicks.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <CheckCircleIcon size={14} />
                        Conversions
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {test.variantA.conversions.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Conversion Rate
                        </span>
                        <span className="text-lg font-bold text-[#3FE0A5]">
                          {test.variantA.conversionRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Variant B */}
                <div className={cn('p-4 rounded-lg border-2 transition-all', test.winner === 'B' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50')}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {test.variantB.name}
                    </h4>
                    {test.winner === 'B' && <span className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium flex items-center gap-1">
                        <CheckCircleIcon size={12} />
                        Winner
                      </span>}
                  </div>
                  {test.variantB.thumbnail && <img src={test.variantB.thumbnail} alt={test.variantB.name} className="w-full h-32 object-cover rounded-lg mb-3" />}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <EyeIcon size={14} />
                        Views
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {test.variantB.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <MousePointerClickIcon size={14} />
                        Clicks
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {test.variantB.clicks.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <CheckCircleIcon size={14} />
                        Conversions
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {test.variantB.conversions.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Conversion Rate
                        </span>
                        <span className="text-lg font-bold text-[#3FE0A5]">
                          {test.variantB.conversionRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Winner Analysis */}
              {test.winner && <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircleIcon size={16} className="text-white" />
                    </div>
                    <div>
                      <h5 className="font-medium text-green-900 dark:text-green-100 mb-1">
                        Test Completed - Variant {test.winner} Won
                      </h5>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Variant {test.winner} showed a{' '}
                        {Math.abs(test.variantA.conversionRate - test.variantB.conversionRate).toFixed(1)}
                        % improvement in conversion rate with {test.confidence}%
                        statistical confidence.
                      </p>
                    </div>
                  </div>
                </div>}
            </div>
          </Card>)}
      </div>
    </div>;
};