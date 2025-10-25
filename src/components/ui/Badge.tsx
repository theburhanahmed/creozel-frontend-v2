import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      outline: 'text-foreground border border-border',
      destructive: 'bg-destructive text-destructive-foreground',
      success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      muted: 'bg-muted text-muted-foreground'
    },
    size: {
      default: 'text-xs px-2.5 py-0.5',
      sm: 'text-[0.65rem] px-2 py-0.5',
      lg: 'text-sm px-3 py-1'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}, ref) => {
  return <div ref={ref} className={cn(badgeVariants({
    variant,
    size
  }), className)} {...props}>
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>;
});
Badge.displayName = 'Badge';