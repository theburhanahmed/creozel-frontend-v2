import React, { useEffect, useState } from 'react';
import { AlertCircleIcon, CheckCircleIcon, InfoIcon, AlertTriangleIcon, XIcon } from 'lucide-react';
import { Portal } from './AccessibilityUtils';
export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  duration?: number;
  onClose?: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  showProgress?: boolean;
  preserveOnHover?: boolean;
}
export const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  variant = 'neutral',
  duration = 5000,
  onClose,
  position = 'top-right',
  icon,
  action,
  className = '',
  showProgress = true,
  preserveOnHover = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  // Handle toast dismissal
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Wait for exit animation
  };
  // Handle progress bar
  useEffect(() => {
    if (!duration || duration <= 0 || !isVisible || isPaused) return;
    const startTime = Date.now();
    const endTime = startTime + duration;
    const updateProgress = () => {
      const now = Date.now();
      const remaining = endTime - now;
      const newProgress = remaining / duration * 100;
      if (newProgress <= 0) {
        handleClose();
      } else {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      }
    };
    const animationId = requestAnimationFrame(updateProgress);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [duration, isVisible, isPaused]);
  // Default icons by variant
  const defaultIcon = () => {
    switch (variant) {
      case 'info':
        return <InfoIcon size={18} />;
      case 'success':
        return <CheckCircleIcon size={18} />;
      case 'warning':
        return <AlertTriangleIcon size={18} />;
      case 'error':
        return <AlertCircleIcon size={18} />;
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
  // Progress bar colors
  const progressColors = {
    info: 'bg-blue-500 dark:bg-blue-400',
    success: 'bg-green-500 dark:bg-green-400',
    warning: 'bg-amber-500 dark:bg-amber-400',
    error: 'bg-red-500 dark:bg-red-400',
    neutral: 'bg-gray-500 dark:bg-gray-400'
  };
  // Position classes
  const positionClasses = {
    'top-right': 'fixed top-4 right-4',
    'top-left': 'fixed top-4 left-4',
    'bottom-right': 'fixed bottom-4 right-4',
    'bottom-left': 'fixed bottom-4 left-4',
    'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2'
  };
  // Animation classes based on position
  const getAnimationClasses = () => {
    const baseClasses = isVisible ? 'animate-in fade-in duration-300' : 'animate-out fade-out duration-300';
    if (position.includes('top')) {
      return `${baseClasses} ${isVisible ? 'slide-in-from-top-5' : 'slide-out-to-top-5'}`;
    } else {
      return `${baseClasses} ${isVisible ? 'slide-in-from-bottom-5' : 'slide-out-to-bottom-5'}`;
    }
  };
  return <Portal>
      <div id={id} role="alert" aria-live="assertive" className={`
          ${positionClasses[position]}
          ${getAnimationClasses()}
          z-50 w-auto max-w-sm
          pointer-events-auto
        `} onMouseEnter={() => preserveOnHover && setIsPaused(true)} onMouseLeave={() => preserveOnHover && setIsPaused(false)}>
        <div className={`
            flex items-start shadow-lg rounded-lg border overflow-hidden
            ${variantStyles[variant]}
            ${className}
          `}>
          {/* Content container */}
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              {/* Icon */}
              {(icon || defaultIcon()) && <div className={`flex-shrink-0 mr-3 ${iconColors[variant]}`}>
                  {icon || defaultIcon()}
                </div>}
              {/* Content */}
              <div className="flex-1 pt-0.5">
                {title && <p className="text-sm font-medium">{title}</p>}
                {description && <p className={`${title ? 'mt-1' : ''} text-sm opacity-90`}>
                    {description}
                  </p>}
                {action && <div className="mt-3">{action}</div>}
              </div>
            </div>
          </div>
          {/* Close button */}
          <div className="flex flex-shrink-0 p-2">
            <button type="button" className={`
                inline-flex rounded-md p-1.5 
                text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              `} onClick={handleClose} aria-label="Close">
              <XIcon size={16} />
            </button>
          </div>
        </div>
        {/* Progress bar */}
        {showProgress && duration > 0 && <div className="relative h-0.5 w-full -mt-0.5 overflow-hidden rounded-b-lg">
            <div className={`absolute bottom-0 left-0 h-full ${progressColors[variant]}`} style={{
          width: `${progress}%`,
          transition: 'width 0.1s linear'
        }} />
          </div>}
      </div>
    </Portal>;
};
// Toast container for managing multiple toasts
export interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  gap?: number;
  className?: string;
  children: React.ReactNode;
}
export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  gap = 8,
  className = '',
  children
}) => {
  const positionClasses = {
    'top-right': 'fixed top-0 right-0 flex flex-col items-end pt-4 pr-4',
    'top-left': 'fixed top-0 left-0 flex flex-col items-start pt-4 pl-4',
    'bottom-right': 'fixed bottom-0 right-0 flex flex-col-reverse items-end pb-4 pr-4',
    'bottom-left': 'fixed bottom-0 left-0 flex flex-col-reverse items-start pb-4 pl-4',
    'top-center': 'fixed top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center pt-4',
    'bottom-center': 'fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col-reverse items-center pb-4'
  };
  return <Portal>
      <div className={`
          ${positionClasses[position]}
          ${className}
        `} style={{
      gap: `${gap}px`
    }} aria-live="polite" aria-atomic="false">
        {children}
      </div>
    </Portal>;
};