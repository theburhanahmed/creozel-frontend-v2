import React from 'react';
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  padding?: boolean | number;
  centered?: boolean;
}
export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = 'lg',
  padding = true,
  centered = true
}) => {
  // Max width classes
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
    none: ''
  };
  // Padding classes
  const getPaddingClass = () => {
    if (padding === false) return '';
    if (typeof padding === 'number') return `px-${padding}`;
    return 'px-4 sm:px-6 lg:px-8';
  };
  return <div className={`
        ${maxWidthClasses[maxWidth]}
        ${getPaddingClass()}
        ${centered ? 'mx-auto' : ''}
        ${className}
      `}>
      {children}
    </div>;
};