import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { CheckCircleIcon, XCircleIcon, AlertCircleIcon, LoaderIcon, SparklesIcon, DollarSignIcon, ClockIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
export interface GenerationStatus {
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  estimatedTimeRemaining?: number;
  creditCost: number;
  canCancel: boolean;
  error?: string;
  result?: any;
}
interface GenerationProgressProps {
  status: GenerationStatus;
  onCancel?: () => void;
  onRetry?: () => void;
  onViewResult?: () => void;
  className?: string;
}
export const GenerationProgress: React.FC<GenerationProgressProps> = ({
  status,
  onCancel,
  onRetry,
  onViewResult,
  className
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    if (status.status === 'processing') {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status.status]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const getStatusIcon = () => {
    switch (status.status) {
      case 'queued':
        return <ClockIcon size={20} className="text-amber-500 animate-pulse" />;
      case 'processing':
        return <LoaderIcon size={20} className="text-[#3FE0A5] animate-spin" />;
      case 'completed':
        return <CheckCircleIcon size={20} className="text-green-500" />;
      case 'failed':
        return <XCircleIcon size={20} className="text-red-500" />;
    }
  };
  const getStatusText = () => {
    switch (status.status) {
      case 'queued':
        return 'Queued';
      case 'processing':
        return 'Generating...';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
    }
  };
  const getStatusColor = () => {
    switch (status.status) {
      case 'queued':
        return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20';
      case 'processing':
        return 'border-[#3FE0A5]/30 dark:border-[#3FE0A5]/30 bg-[#3FE0A5]/5 dark:bg-[#3FE0A5]/10';
      case 'completed':
        return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20';
      case 'failed':
        return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
    }
  };
  return <Card className={cn('overflow-hidden border-2', getStatusColor(), className)}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
              {getStatusIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {getStatusText()}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {status.status === 'processing' && `Elapsed: ${formatTime(elapsedTime)}`}
                {status.status === 'queued' && 'Waiting in queue...'}
                {status.status === 'completed' && 'Your content is ready'}
                {status.status === 'failed' && status.error}
              </p>
            </div>
          </div>
          {/* Credit Cost */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 shadow-sm">
            <DollarSignIcon size={14} className="text-[#3FE0A5]" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {status.creditCost}
            </span>
          </div>
        </div>
        {/* Progress Bar */}
        {(status.status === 'queued' || status.status === 'processing') && <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress
              </span>
              <span className="text-sm font-medium text-[#3FE0A5]">
                {status.progress}%
              </span>
            </div>
            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#3FE0A5] to-[#38B897] transition-all duration-300 ease-out" style={{
            width: `${status.progress}%`
          }}>
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            {status.estimatedTimeRemaining && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                <ClockIcon size={12} />
                Estimated time remaining:{' '}
                {formatTime(status.estimatedTimeRemaining)}
              </p>}
          </div>}
        {/* Processing Steps */}
        {status.status === 'processing' && <div className="space-y-2 mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircleIcon size={12} className="text-white" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Analyzing prompt
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {status.progress > 30 ? <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircleIcon size={12} className="text-white" />
                </div> : <div className="w-4 h-4 rounded-full border-2 border-[#3FE0A5] border-t-transparent animate-spin" />}
              <span className="text-gray-700 dark:text-gray-300">
                Processing with AI
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {status.progress > 70 ? <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircleIcon size={12} className="text-white" />
                </div> : <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />}
              <span className={cn('text-gray-700 dark:text-gray-300', status.progress <= 70 && 'opacity-50')}>
                Finalizing output
              </span>
            </div>
          </div>}
        {/* Actions */}
        <div className="flex items-center gap-2">
          {status.status === 'processing' && status.canCancel && onCancel && <Button variant="outline" size="sm" onClick={onCancel} className="flex-1">
              Cancel
            </Button>}
          {status.status === 'failed' && onRetry && <Button variant="primary" size="sm" onClick={onRetry} className="flex-1" leftIcon={<SparklesIcon size={14} />}>
              Retry
            </Button>}
          {status.status === 'completed' && onViewResult && <Button variant="primary" size="sm" onClick={onViewResult} className="flex-1" leftIcon={<CheckCircleIcon size={14} />}>
              View Result
            </Button>}
        </div>
      </div>
    </Card>;
};