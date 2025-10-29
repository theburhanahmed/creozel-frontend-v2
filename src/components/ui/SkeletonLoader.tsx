import React from 'react';
import { cn } from '../../lib/utils';
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse'
}) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg'
  };
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  };
  return <div className={cn('bg-gray-200 dark:bg-gray-700', variantClasses[variant], animationClasses[animation], className)} style={{
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100%')
  }} aria-hidden="true" />;
};
// Preset skeleton components for common use cases
export const SkeletonCard: React.FC<{
  className?: string;
}> = ({
  className = ''
}) => <div className={cn('bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700', className)}>
    <div className="flex items-start gap-4 mb-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={16} />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" width="100%" height={16} />
      <Skeleton variant="text" width="90%" height={16} />
      <Skeleton variant="text" width="70%" height={16} />
    </div>
  </div>;
export const SkeletonTable: React.FC<{
  rows?: number;
  className?: string;
}> = ({
  rows = 5,
  className = ''
}) => <div className={cn('space-y-3', className)}>
    {Array.from({
    length: rows
  }).map((_, i) => <div key={i} className="flex items-center gap-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="30%" height={16} />
          <Skeleton variant="text" width="60%" height={14} />
        </div>
        <Skeleton variant="rounded" width={80} height={32} />
      </div>)}
  </div>;
export const SkeletonChart: React.FC<{
  className?: string;
}> = ({
  className = ''
}) => <div className={cn('bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700', className)}>
    <div className="flex items-center justify-between mb-6">
      <Skeleton variant="text" width={150} height={24} />
      <Skeleton variant="rounded" width={120} height={36} />
    </div>
    <Skeleton variant="rounded" width="100%" height={300} />
  </div>;