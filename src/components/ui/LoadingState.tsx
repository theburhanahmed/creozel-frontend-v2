import React, { useEffect, useState } from 'react';
interface LoadingStateProps {
  variant?: 'spinner' | 'dots' | 'skeleton' | 'pulse' | 'progress';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  text?: string;
  textPlacement?: 'left' | 'right' | 'top' | 'bottom';
  fullScreen?: boolean;
  fullWidth?: boolean;
  height?: string;
  className?: string;
  showOverlay?: boolean;
  progress?: number;
  progressMax?: number;
  progressText?: string;
  delayMs?: number;
}
export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  textPlacement = 'right',
  fullScreen = false,
  fullWidth = false,
  height,
  className = '',
  showOverlay = false,
  progress = 0,
  progressMax = 100,
  progressText,
  delayMs = 0
}) => {
  const [show, setShow] = useState(delayMs === 0);
  useEffect(() => {
    if (delayMs > 0) {
      const timer = setTimeout(() => {
        setShow(true);
      }, delayMs);
      return () => clearTimeout(timer);
    }
  }, [delayMs]);
  if (!show) return null;
  // Size classes
  const sizeClasses = {
    spinner: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12'
    },
    dots: {
      xs: 'w-1 h-1',
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
      xl: 'w-3 h-3'
    }
  };
  // Color classes
  const colorClasses = {
    default: 'text-gray-500 dark:text-gray-400',
    primary: 'text-green-500 dark:text-green-400',
    secondary: 'text-gray-700 dark:text-gray-300',
    success: 'text-green-500 dark:text-green-400',
    warning: 'text-amber-500 dark:text-amber-400',
    error: 'text-red-500 dark:text-red-400'
  };
  // Text size classes
  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  // Container classes
  const containerClasses = `
    ${fullScreen ? 'fixed inset-0 z-50 flex items-center justify-center' : 'inline-flex'}
    ${fullWidth ? 'w-full' : ''}
    ${height ? height : ''}
    ${showOverlay && fullScreen ? 'bg-gray-900/50 backdrop-blur-sm dark:bg-gray-900/70' : ''}
    ${className}
  `;
  // Determine flex direction based on text placement
  const flexDirection = {
    left: 'flex-row-reverse',
    right: 'flex-row',
    top: 'flex-col-reverse',
    bottom: 'flex-col'
  };
  // Spinner component
  const Spinner = () => <div className={`
        animate-spin rounded-full border-2 border-t-transparent
        ${sizeClasses.spinner[size]}
        ${colorClasses[color]}
      `} role="status" aria-label="Loading" />;
  // Dots component
  const Dots = () => <div className="flex space-x-1">
      {[0, 1, 2].map(i => <div key={i} className={`
            rounded-full
            ${sizeClasses.dots[size]}
            ${colorClasses[color]}
            animate-typing-${i + 1}
          `} />)}
    </div>;
  // Skeleton component
  const Skeleton = () => <div className={`
        w-full h-full rounded-md bg-gray-200 dark:bg-gray-700
        animate-pulse
        ${height ? height : 'h-6'}
      `} role="status" aria-label="Loading" />;
  // Pulse component
  const Pulse = () => <div className={`
        flex items-center justify-center w-full h-full
        ${height ? height : 'h-24'}
      `}>
      <div className="relative">
        <div className={`absolute inset-0 rounded-full bg-green-500/20 animate-ping ${sizeClasses.spinner[size]}`} />
        <div className={`relative rounded-full bg-green-500 ${sizeClasses.spinner[size]}`} />
      </div>
    </div>;
  // Progress component
  const Progress = () => {
    const percentage = Math.min(Math.max(0, progress / progressMax * 100), 100);
    return <div className="w-full">
        <div className="flex justify-between mb-1">
          <span className={`${textSizeClasses[size]} font-medium text-gray-700 dark:text-gray-300`}>
            {text || 'Loading...'}
          </span>
          {progressText || <span className={`${textSizeClasses[size]} font-medium text-gray-700 dark:text-gray-300`}>
              {Math.round(percentage)}%
            </span>}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-green-500 h-2.5 rounded-full transition-all duration-300" style={{
          width: `${percentage}%`
        }}></div>
        </div>
      </div>;
  };
  // Render the appropriate loading indicator
  const renderLoadingIndicator = () => {
    switch (variant) {
      case 'spinner':
        return <Spinner />;
      case 'dots':
        return <Dots />;
      case 'skeleton':
        return <Skeleton />;
      case 'pulse':
        return <Pulse />;
      case 'progress':
        return <Progress />;
      default:
        return <Spinner />;
    }
  };
  // If it's a skeleton or progress, just return the component
  if (variant === 'skeleton' || variant === 'progress') {
    return <div className={containerClasses} aria-busy="true" aria-live="polite">
        {renderLoadingIndicator()}
      </div>;
  }
  // For other variants, handle text placement
  return <div className={`
        ${containerClasses}
        ${text ? `items-center justify-center ${flexDirection[textPlacement]} gap-2` : 'items-center justify-center'}
      `} aria-busy="true" aria-live="polite">
      {renderLoadingIndicator()}
      {text && <span className={`${textSizeClasses[size]} font-medium ${colorClasses[color]}`}>
          {text}
        </span>}
    </div>;
};