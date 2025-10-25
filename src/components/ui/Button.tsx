import React, { forwardRef, Component } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  href?: string;
  ariaLabel?: string;
  className?: string;
  fullWidth?: boolean;
  as?: React.ElementType;
  loading?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  className = '',
  ariaLabel,
  href,
  as: Component,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  const variants = {
    primary: 'bg-gradient-to-r from-[#3FE0A5] to-[#38B897] text-white hover:from-[#38B897] hover:to-[#3FE0A5] focus:ring-[#3FE0A5] shadow-md hover:shadow-lg',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-500',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 focus:ring-green-500 shadow-md hover:shadow-lg',
    neon: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 focus:ring-purple-500 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  // Base classes shared by all button variants
  const baseClasses = cn(baseStyles, {
    'text-xs px-2.5 py-1.5 gap-1.5': size === 'sm',
    'text-sm px-4 py-2 gap-2': size === 'md',
    'text-base px-5 py-2.5 gap-2.5': size === 'lg'
  }, {
    // Primary button with improved gradient and shadow
    'bg-gradient-to-r from-[#3FE0A5] to-[#38B897] hover:brightness-105 active:brightness-95 text-white shadow-sm hover:shadow-md hover:shadow-[#3FE0A5]/10': variant === 'primary',
    // Secondary button with improved hover state
    'bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white shadow-sm hover:shadow': variant === 'secondary',
    // Outline button with improved border and hover
    'border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500': variant === 'outline',
    // Ghost button with improved hover state
    'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white': variant === 'ghost',
    // Link button with improved hover and focus states
    'bg-transparent underline-offset-4 hover:underline p-0 h-auto text-[#3FE0A5] dark:text-[#3FE0A5] hover:text-[#38B897] dark:hover:text-[#38B897] focus:text-[#38B897]': variant === 'link',
    // Destructive button with improved hover and shadow
    'bg-gradient-to-r from-red-500 to-red-600 hover:brightness-105 active:brightness-95 text-white shadow-sm hover:shadow-md hover:shadow-red-500/10': variant === 'destructive',
    // Neon button with enhanced glow effect
    'bg-[#3FE0A5] hover:bg-[#38B897] text-white shadow-lg shadow-[#3FE0A5]/30 dark:shadow-[#3FE0A5]/20 hover:shadow-xl hover:shadow-[#3FE0A5]/40 dark:hover:shadow-[#3FE0A5]/30': variant === 'neon'
  }, className);
  // Loading state display with improved animation
  const content = loading ? <>
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>{loadingText || children}</span>
    </> : <>
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </>;
  // If href is provided, render as Link with improved transitions
  if (href) {
    return <Link to={href} className={baseClasses} aria-label={ariaLabel}>
        {content}
      </Link>;
  }
  // If custom component is provided
  if (Component) {
    return <Component className={baseClasses} aria-label={ariaLabel} {...props}>
        {content}
      </Component>;
  }
  // Default button with improved focus and active states
  return <button className={baseClasses} aria-label={ariaLabel} disabled={loading || disabled} {...props}>
      {content}
    </button>;
};
Button.displayName = 'Button';