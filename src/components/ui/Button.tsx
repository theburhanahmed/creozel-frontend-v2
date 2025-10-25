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
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingText,
  href,
  ariaLabel,
  className,
  fullWidth = false,
  as: Component,
  ...props
}, ref) => {
  // Base classes shared by all button variants
  const baseClasses = cn('inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200', 'disabled:opacity-50 disabled:pointer-events-none', 'focus-visible:ring-2 focus-visible:ring-[#3FE0A5] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800', 'active:scale-[0.98] transform', fullWidth && 'w-full',
  // Size variations with improved padding and font sizing
  {
    'text-xs px-2.5 py-1.5 gap-1.5': size === 'sm',
    'text-sm px-4 py-2 gap-2': size === 'md',
    'text-base px-5 py-2.5 gap-2.5': size === 'lg'
  },
  // Variant styles with enhanced visual feedback
  {
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
  const content = isLoading ? <>
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
  return <button ref={ref} className={baseClasses} aria-label={ariaLabel} disabled={isLoading || props.disabled} {...props}>
        {content}
      </button>;
});
Button.displayName = 'Button';