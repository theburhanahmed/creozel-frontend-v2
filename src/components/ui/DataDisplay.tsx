import React from 'react';
import { Card } from './Card';
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, TrendingDownIcon, MinusIcon } from 'lucide-react';
export interface DataDisplayProps {
  title: string;
  value: string | number;
  description?: string;
  change?: {
    value: number;
    isPositive?: boolean;
    label?: string;
  };
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  footer?: React.ReactNode;
  className?: string;
  valueClassName?: string;
  onClick?: () => void;
  variant?: 'default' | 'compact' | 'detailed';
  status?: 'default' | 'success' | 'warning' | 'error';
}
export const DataDisplay: React.FC<DataDisplayProps> = ({
  title,
  value,
  description,
  change,
  icon,
  trend,
  footer,
  className = '',
  valueClassName = '',
  onClick,
  variant = 'default',
  status = 'default'
}) => {
  // Determine if trend is positive or negative based on change
  const effectiveTrend = trend || (change?.isPositive ? 'up' : change?.value === 0 ? 'neutral' : 'down');
  // Status colors
  const statusColors = {
    default: '',
    success: 'border-green-500/30 dark:border-green-500/20 bg-green-50/30 dark:bg-green-900/10',
    warning: 'border-amber-500/30 dark:border-amber-500/20 bg-amber-50/30 dark:bg-amber-900/10',
    error: 'border-red-500/30 dark:border-red-500/20 bg-red-50/30 dark:bg-red-900/10'
  };
  // Trend colors
  const trendColors = {
    up: 'text-green-600 dark:text-green-400 bg-green-100/50 dark:bg-green-900/30',
    down: 'text-red-600 dark:text-red-400 bg-red-100/50 dark:bg-red-900/30',
    neutral: 'text-gray-600 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-800/50'
  };
  // Trend icons
  const TrendIcon = () => {
    switch (effectiveTrend) {
      case 'up':
        return variant === 'compact' ? <ArrowUpIcon size={12} className="text-green-600 dark:text-green-400" /> : <TrendingUpIcon size={16} className="text-green-600 dark:text-green-400" />;
      case 'down':
        return variant === 'compact' ? <ArrowDownIcon size={12} className="text-red-600 dark:text-red-400" /> : <TrendingDownIcon size={16} className="text-red-600 dark:text-red-400" />;
      case 'neutral':
      default:
        return <MinusIcon size={variant === 'compact' ? 12 : 16} className="text-gray-600 dark:text-gray-400" />;
    }
  };
  // Render compact variant
  if (variant === 'compact') {
    return <div className={`
          flex items-center space-x-3 p-3 rounded-lg
          ${onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors' : ''}
          ${statusColors[status]}
          ${className}
        `} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
        {icon && <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
            {icon}
          </div>}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {title}
          </p>
          <div className="flex items-center mt-1">
            <p className={`text-base font-semibold text-gray-900 dark:text-white truncate ${valueClassName}`}>
              {value}
            </p>
            {change && <div className={`ml-2 flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${trendColors[effectiveTrend]}`}>
                <TrendIcon />
                <span className="ml-1">{change.value}%</span>
              </div>}
          </div>
        </div>
      </div>;
  }
  // Render detailed variant
  if (variant === 'detailed') {
    return <Card className={`overflow-hidden ${className} ${statusColors[status]}`} onClick={onClick} hover={!!onClick}>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            {icon && <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                {icon}
              </div>}
          </div>
          <div className="mt-2">
            <p className={`text-2xl font-bold text-gray-900 dark:text-white ${valueClassName}`}>
              {value}
            </p>
          </div>
          <div className="mt-4">
            {change && <div className="flex items-center">
                <div className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${trendColors[effectiveTrend]}`}>
                  <TrendIcon />
                  <span className="ml-1">{change.value}%</span>
                </div>
                {change.label && <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {change.label}
                  </span>}
              </div>}
            {description && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>}
          </div>
        </div>
        {footer && <div className="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 border-t border-gray-200 dark:border-gray-700">
            {footer}
          </div>}
      </Card>;
  }
  // Render default variant
  return <Card className={`${className} ${statusColors[status]}`} onClick={onClick} hover={!!onClick}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          {icon && <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
              {icon}
            </div>}
        </div>
        <div className="mt-1">
          <p className={`text-xl font-semibold text-gray-900 dark:text-white ${valueClassName}`}>
            {value}
          </p>
        </div>
        {(change || description) && <div className="mt-2">
            {change && <div className="flex items-center">
                <TrendIcon />
                <span className={`ml-1 text-sm font-medium ${effectiveTrend === 'up' ? 'text-green-600 dark:text-green-400' : effectiveTrend === 'down' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {change.value}%
                </span>
                {change.label && <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                    {change.label}
                  </span>}
              </div>}
            {description && !change && <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>}
          </div>}
      </div>
      {footer && <div className="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>}
    </Card>;
};