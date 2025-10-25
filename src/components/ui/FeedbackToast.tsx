import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CheckCircleIcon, AlertCircleIcon, InfoIcon, XIcon, AlertTriangleIcon, LoaderIcon } from 'lucide-react';
type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';
interface ToastOptions {
  duration?: number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}
const toastIcons = {
  success: <CheckCircleIcon size={18} className="text-green-500 dark:text-green-400" />,
  error: <AlertCircleIcon size={18} className="text-red-500 dark:text-red-400" />,
  info: <InfoIcon size={18} className="text-blue-500 dark:text-blue-400" />,
  warning: <AlertTriangleIcon size={18} className="text-amber-500 dark:text-amber-400" />,
  loading: <LoaderIcon size={18} className="text-indigo-500 dark:text-indigo-400 animate-spin" />
};
export const showToast = (type: ToastType, message: string, options?: ToastOptions) => {
  const icon = toastIcons[type];
  const toastContent = <div className="flex items-start">
      <div className="flex-shrink-0 mr-3 mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="font-medium text-gray-900 dark:text-white">{message}</p>
        {options?.description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {options.description}
          </p>}
      </div>
    </div>;
  if (type === 'loading') {
    return toast.custom(toastContent, {
      duration: Infinity,
      ...options
    });
  }
  return toast[type](toastContent, options);
};
export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};
interface FeedbackIndicatorProps {
  type: ToastType;
  message: string;
  visible: boolean;
  onDismiss?: () => void;
  className?: string;
}
export const FeedbackIndicator: React.FC<FeedbackIndicatorProps> = ({
  type,
  message,
  visible,
  onDismiss,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (visible) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);
  if (!isVisible) return null;
  const bgColors = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30',
    loading: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/30'
  };
  return <div className={`
      rounded-lg border p-4 transition-all duration-300
      ${bgColors[type]}
      ${visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}
      ${className}
    `}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{toastIcons[type]}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {message}
          </p>
        </div>
        {onDismiss && <button onClick={onDismiss} className="ml-auto -mx-1.5 -my-1.5 bg-transparent text-gray-400 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-lg p-1.5 inline-flex items-center justify-center" aria-label="Dismiss">
            <XIcon size={16} />
          </button>}
      </div>
    </div>;
};