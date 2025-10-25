import React from 'react';
interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  axis?: 'horizontal' | 'vertical';
  className?: string;
}
export const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  axis = 'vertical',
  className = ''
}) => {
  const sizes = {
    xs: axis === 'vertical' ? 'h-1' : 'w-1',
    sm: axis === 'vertical' ? 'h-2' : 'w-2',
    md: axis === 'vertical' ? 'h-4' : 'w-4',
    lg: axis === 'vertical' ? 'h-6' : 'w-6',
    xl: axis === 'vertical' ? 'h-8' : 'w-8',
    '2xl': axis === 'vertical' ? 'h-12' : 'w-12',
    '3xl': axis === 'vertical' ? 'h-16' : 'w-16',
    '4xl': axis === 'vertical' ? 'h-24' : 'w-24'
  };
  return <div className={`${sizes[size]} ${className}`} aria-hidden="true" />;
};
interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}
export const Divider: React.FC<DividerProps> = ({
  className = '',
  orientation = 'horizontal',
  label
}) => {
  if (orientation === 'vertical') {
    return <div className={`h-full w-px bg-gray-200 dark:bg-gray-700 ${className}`} aria-hidden="true" />;
  }
  if (label) {
    return <div className={`relative ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 bg-white dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
            {label}
          </span>
        </div>
      </div>;
  }
  return <div className={`w-full h-px bg-gray-200 dark:bg-gray-700 ${className}`} aria-hidden="true" />;
};
interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}
export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = 'md',
  className = ''
}) => {
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
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };
  return <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>;
};