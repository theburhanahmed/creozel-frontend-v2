import React from 'react';
interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  variant?: 'circle' | 'dots' | 'pulse';
  label?: string;
  className?: string;
  overlay?: boolean;
  fullPage?: boolean;
}
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  variant = 'circle',
  label,
  className = '',
  overlay = false,
  fullPage = false
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };
  // Size for dots
  const dotSizeClasses = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
    xl: 'w-3 h-3'
  };
  // Color classes
  const colorClasses = {
    primary: 'text-green-500',
    secondary: 'text-gray-500',
    white: 'text-white',
    gray: 'text-gray-400'
  };
  // Label size classes
  const labelSizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base'
  };
  // Render the spinner based on variant
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return <div className="flex space-x-1.5">
            <div className={`${dotSizeClasses[size]} rounded-full bg-current animate-typing-1`} />
            <div className={`${dotSizeClasses[size]} rounded-full bg-current animate-typing-2`} />
            <div className={`${dotSizeClasses[size]} rounded-full bg-current animate-typing-3`} />
          </div>;
      case 'pulse':
        return <div className={`${sizeClasses[size]} rounded-full border-2 border-current opacity-75 animate-pulse`} />;
      case 'circle':
      default:
        return <svg className={`${sizeClasses[size]} animate-spin`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>;
    }
  };
  // For overlay or fullPage spinner
  if (overlay || fullPage) {
    return <div className={`
          fixed 
          ${fullPage ? 'inset-0' : 'inset-x-0 top-0 bottom-0'} 
          flex flex-col items-center justify-center 
          bg-gray-900/50 dark:bg-black/60 backdrop-blur-sm 
          z-50
        `} role="status" aria-live="polite">
        <div className={`
            flex flex-col items-center justify-center p-4 
            bg-white dark:bg-gray-800 
            rounded-lg shadow-xl
          `}>
          <div className={colorClasses[color]}>{renderSpinner()}</div>
          {label && <span className={`mt-3 ${labelSizeClasses[size]} font-medium text-gray-700 dark:text-gray-300`}>
              {label}
            </span>}
        </div>
      </div>;
  }
  // Regular spinner
  return <div className={`inline-flex flex-col items-center ${className}`} role="status" aria-live="polite">
      <div className={colorClasses[color]}>{renderSpinner()}</div>
      {label && <span className={`mt-2 ${labelSizeClasses[size]} font-medium text-gray-700 dark:text-gray-300`}>
          {label}
        </span>}
    </div>;
};
// Skeleton loading component
interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
  circle?: boolean;
  animate?: boolean;
}
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = true,
  circle = false,
  animate = true
}) => {
  return <div className={`
        bg-gray-200 dark:bg-gray-700 
        ${width} ${height} 
        ${rounded && !circle ? 'rounded' : ''}
        ${circle ? 'rounded-full' : ''}
        ${animate ? 'animate-pulse' : ''}
        ${className}
      `} aria-hidden="true" />;
};
// Skeleton text component for multiple lines
interface SkeletonTextProps {
  lines?: number;
  width?: string | string[];
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
}
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  width = 'w-full',
  className = '',
  spacing = 'normal'
}) => {
  // Spacing between lines
  const spacingClasses = {
    tight: 'space-y-1',
    normal: 'space-y-2',
    loose: 'space-y-3'
  };
  // Handle array of widths or single width
  const getWidth = (index: number) => {
    if (Array.isArray(width)) {
      return width[index % width.length];
    }
    // Make last line shorter if multiple lines
    if (lines > 1 && index === lines - 1) {
      return 'w-4/5';
    }
    return width;
  };
  return <div className={`${spacingClasses[spacing]} ${className}`}>
      {Array.from({
      length: lines
    }).map((_, index) => <Skeleton key={index} width={getWidth(index)} height="h-4" className="rounded" />)}
    </div>;
};