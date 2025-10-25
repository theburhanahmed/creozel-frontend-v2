import React, { Fragment } from 'react';
import { CheckIcon, AlertTriangleIcon, XIcon } from 'lucide-react';
interface ProgressIndicatorProps {
  value: number;
  max?: number;
  variant?: 'line' | 'circle' | 'steps';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  valueFormat?: 'percentage' | 'fraction' | 'none';
  status?: 'default' | 'success' | 'error' | 'warning';
  thickness?: number;
  className?: string;
  label?: string;
  animated?: boolean;
  steps?: number;
  currentStep?: number;
  stepLabels?: string[];
}
export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  max = 100,
  variant = 'line',
  size = 'md',
  showValue = true,
  valueFormat = 'percentage',
  status = 'default',
  thickness = 4,
  className = '',
  label,
  animated = true,
  steps = 4,
  currentStep = 1,
  stepLabels = []
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max(0, value / max * 100), 100);
  // Format the value display
  const formattedValue = () => {
    if (valueFormat === 'percentage') {
      return `${Math.round(percentage)}%`;
    } else if (valueFormat === 'fraction') {
      return `${value}/${max}`;
    }
    return '';
  };
  // Status colors
  const statusColors = {
    default: 'bg-green-500 text-green-500',
    success: 'bg-green-500 text-green-500',
    error: 'bg-red-500 text-red-500',
    warning: 'bg-amber-500 text-amber-500'
  };
  // Size classes
  const sizeClasses = {
    line: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    },
    circle: {
      sm: 'w-16 h-16',
      md: 'w-24 h-24',
      lg: 'w-32 h-32'
    },
    steps: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    }
  };
  // Status icons
  const StatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckIcon size={16} className="text-white" />;
      case 'error':
        return <XIcon size={16} className="text-white" />;
      case 'warning':
        return <AlertTriangleIcon size={16} className="text-white" />;
      default:
        return null;
    }
  };
  // Render line progress
  if (variant === 'line') {
    return <div className={className}>
        {label && <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
            {showValue && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formattedValue()}
              </span>}
          </div>}
        <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizeClasses.line[size]}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-valuetext={formattedValue()} aria-label={label}>
          <div className={`
              ${statusColors[status]} rounded-full
              ${animated ? 'transition-all duration-500 ease-out' : ''}
              ${animated && percentage < 5 ? 'transition-none' : ''}
            `} style={{
          width: `${percentage}%`
        }}>
            {status !== 'default' && size === 'lg' && <div className="flex justify-end items-center h-full pr-1">
                <div className={`rounded-full p-0.5 ${status === 'default' ? 'bg-white' : `bg-${status}-600`}`}>
                  <StatusIcon />
                </div>
              </div>}
          </div>
        </div>
      </div>;
  }
  // Render circle progress
  if (variant === 'circle') {
    const radius = 50 - thickness / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - percentage / 100 * circumference;
    return <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg className={`transform -rotate-90 ${sizeClasses.circle[size]}`} viewBox="0 0 100 100" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-valuetext={formattedValue()} aria-label={label}>
          {/* Background circle */}
          <circle className="text-gray-200 dark:text-gray-700" strokeWidth={thickness} stroke="currentColor" fill="transparent" r={radius} cx="50" cy="50" />
          {/* Progress circle */}
          <circle className={`${statusColors[status].split(' ')[1]} ${animated ? 'transition-all duration-500 ease-out' : ''}`} strokeWidth={thickness} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="50" cy="50" />
        </svg>
        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          {status !== 'default' ? <div className={`rounded-full p-1.5 ${statusColors[status].split(' ')[0]}`}>
              <StatusIcon />
            </div> : showValue ? <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {formattedValue()}
            </span> : null}
          {label && <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {label}
            </span>}
        </div>
      </div>;
  }
  // Render steps progress
  if (variant === 'steps') {
    return <div className={className}>
        {label && <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
            {showValue && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {`${currentStep}/${steps}`}
              </span>}
          </div>}
        <div className="flex items-center w-full">
          {Array.from({
          length: steps
        }).map((_, index) => {
          const isCompleted = index < currentStep - 1;
          const isCurrent = index === currentStep - 1;
          const stepColor = isCompleted || isCurrent ? statusColors[status].split(' ')[0] : 'bg-gray-200 dark:bg-gray-700';
          return <Fragment key={index}>
                {/* Step circle */}
                <div className={`
                    relative flex items-center justify-center rounded-full
                    ${isCompleted ? `${statusColors[status].split(' ')[0]} text-white` : isCurrent ? `${statusColors[status].split(' ')[0]} text-white` : 'bg-gray-200 dark:bg-gray-700'}
                    ${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'}
                    ${animated ? 'transition-all duration-300' : ''}
                  `}>
                  {isCompleted ? <CheckIcon size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} /> : <span className={`text-${size === 'sm' ? 'xs' : 'sm'} font-medium ${isCurrent ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      {index + 1}
                    </span>}
                </div>
                {/* Connector line */}
                {index < steps - 1 && <div className="flex-1 mx-2">
                    <div className={`h-1 rounded-full ${isCompleted ? statusColors[status].split(' ')[0] : 'bg-gray-200 dark:bg-gray-700'} ${animated ? 'transition-all duration-500' : ''}`} />
                  </div>}
              </Fragment>;
        })}
        </div>
        {/* Step labels */}
        {stepLabels.length > 0 && <div className="flex items-center justify-between mt-2">
            {stepLabels.map((label, index) => <div key={index} className={`text-xs ${index < currentStep ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`} style={{
          width: `${100 / stepLabels.length}%`,
          textAlign: index === 0 ? 'left' : index === stepLabels.length - 1 ? 'right' : 'center'
        }}>
                {label}
              </div>)}
          </div>}
      </div>;
  }
  return null;
};