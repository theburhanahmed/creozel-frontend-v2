import React, { useEffect, useState } from 'react';
import { AlertCircleIcon, CheckCircleIcon, InfoIcon, AlertTriangleIcon, XIcon, BellIcon } from 'lucide-react';
import { Button } from './Button';
import { Portal } from './AccessibilityUtils';
export interface AlertProps {
  title?: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
  className?: string;
  children?: React.ReactNode;
  autoClose?: number | false;
  position?: 'static' | 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  animate?: boolean;
}
export const Alert: React.FC<AlertProps> = ({
  title,
  description,
  variant = 'info',
  size = 'md',
  icon,
  action,
  onClose,
  dismissible = false,
  className = '',
  children,
  autoClose = false,
  position = 'static',
  animate = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  // Handle auto close
  useEffect(() => {
    if (autoClose && typeof autoClose === 'number') {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose]);
  // Handle animation end
  const handleAnimationEnd = () => {
    if (!isVisible) {
      setIsMounted(false);
      if (onClose) onClose();
    }
  };
  // Don't render if not mounted
  if (!isMounted) return null;
  // Default icons by variant
  const defaultIcon = () => {
    switch (variant) {
      case 'info':
        return <InfoIcon size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />;
      case 'success':
        return <CheckCircleIcon size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />;
      case 'warning':
        return <AlertTriangleIcon size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />;
      case 'error':
        return <AlertCircleIcon size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />;
      case 'neutral':
        return <BellIcon size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />;
      default:
        return null;
    }
  };
  // Variant styles
  const variantStyles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30 text-blue-800 dark:text-blue-300',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30 text-green-800 dark:text-green-300',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30 text-amber-800 dark:text-amber-300',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30 text-red-800 dark:text-red-300',
    neutral: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300'
  };
  // Icon colors
  const iconColors = {
    info: 'text-blue-500 dark:text-blue-400',
    success: 'text-green-500 dark:text-green-400',
    warning: 'text-amber-500 dark:text-amber-400',
    error: 'text-red-500 dark:text-red-400',
    neutral: 'text-gray-500 dark:text-gray-400'
  };
  // Size classes
  const sizeClasses = {
    sm: 'p-2 text-xs',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base'
  };
  // Position classes
  const positionClasses = {
    static: '',
    top: 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-md',
    bottom: 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-md',
    'top-right': 'fixed top-4 right-4 z-50 w-auto max-w-md',
    'top-left': 'fixed top-4 left-4 z-50 w-auto max-w-md',
    'bottom-right': 'fixed bottom-4 right-4 z-50 w-auto max-w-md',
    'bottom-left': 'fixed bottom-4 left-4 z-50 w-auto max-w-md'
  };
  // Animation classes
  const animationClasses = animate ? isVisible ? position !== 'static' ? 'animate-in fade-in duration-300 slide-in-from-top-5' : 'animate-in fade-in duration-300' : position !== 'static' ? 'animate-out fade-out duration-300 slide-out-to-top-5' : 'animate-out fade-out duration-300' : '';
  // Render the alert
  const alertContent = <div role="alert" className={`
        flex items-start border rounded-lg shadow-sm
        ${variantStyles[variant]}
        ${sizeClasses[size]}
        ${positionClasses[position]}
        ${animationClasses}
        ${className}
      `} onAnimationEnd={handleAnimationEnd}>
      {/* Icon */}
      {(icon || defaultIcon()) && <div className={`flex-shrink-0 mr-3 ${iconColors[variant]}`}>
          {icon || defaultIcon()}
        </div>}
      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        {title && <h3 className="font-medium">{title}</h3>}
        {/* Description or children */}
        {description ? <div className={`${title ? 'mt-1' : ''} text-${size === 'lg' ? 'sm' : 'xs'} opacity-90`}>
            {description}
          </div> : children ? <div className={title ? 'mt-1' : ''}>{children}</div> : null}
        {/* Action */}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {/* Close button */}
      {dismissible && <Button variant="ghost" size="sm" className="ml-2 -mr-1 -mt-1 p-1" onClick={() => setIsVisible(false)} ariaLabel="Close alert" iconOnly>
          <XIcon size={size === 'sm' ? 14 : 16} />
        </Button>}
    </div>;
  // Use Portal for positioned alerts
  return position !== 'static' ? <Portal>{alertContent}</Portal> : alertContent;
};