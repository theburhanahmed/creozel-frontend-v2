import React, { forwardRef, Component } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  as?: React.ElementType;
}
export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className,
  onClick,
  href,
  as: Component = 'div',
  ...props
}, ref) => {
  const cardClasses = cn('bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden', 'transition-all duration-200 ease-in-out', className);
  if (href) {
    return <Link to={href} className={cn(cardClasses, 'hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow')} {...props}>
          {children}
        </Link>;
  }
  if (onClick) {
    return <div ref={ref} className={cn(cardClasses, 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow')} onClick={onClick} {...props}>
          {children}
        </div>;
  }
  return <Component ref={ref} className={cardClasses} {...props}>
        {children}
      </Component>;
});
Card.displayName = 'Card';
// Card Header component with improved spacing
export const CardHeader = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)} {...props}>
    {children}
  </div>;
// Card Content component with improved spacing
export const CardContent = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn('px-6 py-5', className)} {...props}>
    {children}
  </div>;
// Card Footer component with improved spacing
export const CardFooter = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn('px-6 py-4 border-t border-gray-200 dark:border-gray-700', className)} {...props}>
    {children}
  </div>;
// Card Menu component for navigation menus with enhanced visual design
interface CardMenuItem {
  icon: React.ReactNode;
  title: string;
  href: string;
}
interface CardMenuProps {
  items: CardMenuItem[];
  className?: string;
}
export const CardMenu = ({
  items,
  className
}: CardMenuProps) => {
  return;
};