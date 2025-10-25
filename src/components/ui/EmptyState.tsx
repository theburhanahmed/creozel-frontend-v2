import React from 'react';
import { Button } from './Button';
import { Card } from './Card';
interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  variant?: 'default' | 'card' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
  illustration?: React.ReactNode;
}
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  secondaryAction,
  className = '',
  variant = 'default',
  size = 'md',
  centered = true,
  illustration
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12'
  };
  // Icon size classes
  const iconSizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };
  // Title size classes
  const titleSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };
  // Description size classes
  const descriptionSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  // Button size mapping
  const buttonSizeMap = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'md' as const
  };
  const content = <div className={`
        ${centered ? 'flex flex-col items-center text-center' : ''}
        ${sizeClasses[size]}
        ${className}
      `}>
      {/* Icon or Illustration */}
      {illustration ? <div className="mb-4">{illustration}</div> : icon ? <div className={`
            ${iconSizeClasses[size]} 
            flex items-center justify-center 
            rounded-full bg-gray-100 dark:bg-gray-800 
            text-gray-500 dark:text-gray-400
            mb-4
          `}>
          {icon}
        </div> : null}
      {/* Title */}
      <h3 className={`
          ${titleSizeClasses[size]} 
          font-semibold text-gray-900 dark:text-white
          ${description ? 'mb-2' : 'mb-4'}
        `}>
        {title}
      </h3>
      {/* Description */}
      {description && <p className={`
            ${descriptionSizeClasses[size]} 
            text-gray-500 dark:text-gray-400 
            mb-4 
            max-w-md 
            ${centered ? 'mx-auto' : ''}
          `}>
          {description}
        </p>}
      {/* Actions */}
      {(action || secondaryAction) && <div className="flex flex-wrap gap-3 mt-2">
          {action && <Button onClick={action.onClick} size={buttonSizeMap[size]}>
              {action.label}
            </Button>}
          {secondaryAction && <Button variant="outline" onClick={secondaryAction.onClick} size={buttonSizeMap[size]}>
              {secondaryAction.label}
            </Button>}
        </div>}
    </div>;
  // Render inside a card if variant is 'card'
  if (variant === 'card') {
    return <Card className={`overflow-hidden ${centered ? 'flex items-center justify-center' : ''}`}>
        {content}
      </Card>;
  }
  // Render with a subtle background if variant is 'default'
  if (variant === 'default') {
    return <div className={`
          bg-gray-50 dark:bg-gray-800/30 
          border border-gray-200 dark:border-gray-700/30 
          rounded-lg 
          px-6
          ${sizeClasses[size]}
        `}>
        {content}
      </div>;
  }
  // Render minimal version
  return content;
};