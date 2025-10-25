import React from 'react';
export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'avatar' | 'button' | 'card' | 'list' | 'table';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
  count?: number;
  inline?: boolean;
  rounded?: boolean | 'full' | 'none' | 'sm' | 'md' | 'lg' | 'xl';
  circle?: boolean;
}
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  animation = 'pulse',
  count = 1,
  inline = false,
  rounded = 'md',
  circle = false
}) => {
  // Animation classes
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-600/50 to-transparent bg-[length:400%_100%]',
    none: ''
  };
  // Rounded classes
  const getRoundedClasses = () => {
    if (rounded === true || rounded === 'md') return 'rounded-md';
    if (rounded === 'full' || circle || variant === 'circular' || variant === 'avatar') return 'rounded-full';
    if (rounded === 'none') return '';
    if (rounded === 'sm') return 'rounded-sm';
    if (rounded === 'lg') return 'rounded-lg';
    if (rounded === 'xl') return 'rounded-xl';
    return '';
  };
  // Base classes
  const baseClasses = ['bg-gray-200 dark:bg-gray-700', animationClasses[animation], getRoundedClasses(), className].filter(Boolean).join(' ');
  // Style object with width and height
  const style: React.CSSProperties = {
    width: width !== undefined ? typeof width === 'number' ? `${width}px` : width : undefined,
    height: height !== undefined ? typeof height === 'number' ? `${height}px` : height : undefined,
    display: inline ? 'inline-block' : 'block'
  };
  // Variant-specific dimensions and classes
  const getVariantProps = () => {
    switch (variant) {
      case 'text':
        return {
          width: width || '100%',
          height: height || '1em',
          marginBottom: '0.5em'
        };
      case 'circular':
      case 'avatar':
        return {
          width: width || 40,
          height: height || 40,
          borderRadius: '50%'
        };
      case 'button':
        return {
          width: width || 80,
          height: height || 36
        };
      case 'card':
        return {
          width: width || '100%',
          height: height || 200
        };
      case 'list':
        return {
          width: width || '100%',
          height: height || 20,
          marginBottom: 8
        };
      case 'table':
        return {
          width: width || '100%',
          height: height || 20
        };
      default:
        return {
          width: width || 100,
          height: height || 100
        };
    }
  };
  // Combine style with variant-specific props
  const combinedStyle = {
    ...style,
    ...getVariantProps()
  };
  // Render multiple skeletons if count > 1
  if (count > 1) {
    return <>
        {Array.from({
        length: count
      }).map((_, index) => <div key={index} className={baseClasses} style={combinedStyle} aria-hidden="true" data-testid="skeleton" />)}
      </>;
  }
  // Render single skeleton
  return <div className={baseClasses} style={combinedStyle} aria-hidden="true" data-testid="skeleton" />;
};
export interface SkeletonTextProps extends Omit<SkeletonProps, 'variant'> {
  lines?: number;
  lineHeight?: number | string;
  spacing?: number | string;
  lastLineWidth?: string | number;
  paragraph?: boolean;
}
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lineHeight = '1em',
  spacing = '0.5em',
  lastLineWidth = '80%',
  paragraph = true,
  ...props
}) => {
  return <div className={paragraph ? 'space-y-2' : ''}>
      {Array.from({
      length: lines
    }).map((_, index) => <Skeleton key={index} variant="text" width={index === lines - 1 && lastLineWidth !== '100%' ? lastLineWidth : '100%'} height={lineHeight} className={index < lines - 1 ? `mb-${spacing}` : ''} {...props} />)}
    </div>;
};